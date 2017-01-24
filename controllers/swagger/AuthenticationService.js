'use strict';
var ParamUtil   = require('../../util/ParamUtil.js');
var HttpUtil    = require('../../util/HttpUtil.js');
var JSONXMLUtil = require('../../util/JSONXMLUtil.js');

var BasicStrategy    = require('passport-http').BasicStrategy;
var XingStrategy     = require('passport-xing').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var User         = require('../../models/User');
var UsersService = require('./UsersService');

/**
 *
 * @param {string} username
 * @param {string} [password]
 * @param {string} provider
 * @param {string} [accessToken]
 * @param {string} [refreshTokenOrSecret]
 * @param {function} done
 */
function findUser(username, password, provider, accessToken, refreshTokenOrSecret, done) {
	UsersService.findUser(username, password, provider, accessToken, refreshTokenOrSecret, function (user, err) {
		if (!err) {
			if (!user) {
				return done(null, false);
			}
			//check password for basic accounts
			if (user.password !== password && provider === 'basic') {
				return done(null, false);
			}
			else {
				return done(user, true);
			}
		}
		else {
			//user not found
			if (err.code === 404) {
				if (provider === 'basic') {
					return done(null, false);
				} else {
					//we create a new one for social media logins
					return createSocialMediaUser(provider, username, accessToken, refreshTokenOrSecret, done);
				}
			}
			//other error
			return done(err);
		}
	});
}

/**
 *
 * @param {string} id
 * @param {string} provider
 * @param {string} accessToken
 * @param {string} refreshTokenOrSecret
 * @param {function} done
 */
function createSocialMediaUser(provider, id, accessToken, refreshTokenOrSecret, done) {
	var user = new User();

	//fill required fields
	switch (provider) {
		case 'xing':
			user.xingId           = id;
			user.xingAccessToken  = accessToken;
			user.xingAccessSecret = refreshTokenOrSecret;
			break;

		case 'linkedIn':
			user.linkedInId           = id;
			user.linkedInAccessToken  = accessToken;
			user.linkedInRefreshToken = refreshTokenOrSecret;
			break;
	}

	//save
	UsersService.createUser(user, function (user, err) {
		if (!err) {
			done(user, true);
		}
		else {
			done(err);
		}
	})
}

global.passport.use('basic', new BasicStrategy(
	function (username, password, done) {
		findUser(username, password, 'basic', undefined, undefined, done);
	}
));

global.passport.use('xing-login', new XingStrategy({
		consumerKey   : process.env.xing_app_id,
		consumerSecret: process.env.xing_app_key,
		callbackURL   : 'http://localhost:9090/api/v1/users/authenticate/xing/callback'
	},
	function (token, tokenSecret, profile, done) {
		findUser(profile.id, undefined, 'xing', token, tokenSecret, done);
	}
));

global.passport.use('linkedIn-login', new LinkedInStrategy({
	clientID    : process.env.linkedIn_app_id,
	clientSecret: process.env.linkedIn_app_key,
	callbackURL : "http://localhost:9090/api/v1/users/authenticate/linkedIn/callback",
	scope       : ['r_basicprofile'],
	state       : true
}, function (accessToken, refreshToken, profile, done) {
	findUser(profile.id, undefined, 'linkedIn', accessToken, refreshToken, done);
}));

var basic    = global.passport.authenticate('basic', {session: true});
var xing     = global.passport.authenticate('xing-login', {session: true});
var linkedIn = global.passport.authenticate('linkedIn-login', {session: true});

exports.usersAuthenticateGET = function (args, req, res, next) {
	/**
	 * parameters expected in the args:
	 * provider (String)
	 * username (String)
	 * password (String)
	 **/
	switch (args.provider.value) {
		case "linkedIn":
			return linkedIn(req, res, next);
		case "xing":
			return xing(req, res, next);
		case "basic":
			return basic(req, res, next);
	}
	return null;
};

exports.usersAuthenticateProviderCallbackGET = function (args, req, res, next) {
	switch (args.provider.value) {
		case "linkedIn":
			return linkedIn(req, res, next);
			break;
		case "xing":
			return xing(req, res, next);
	}
	return null;
};
