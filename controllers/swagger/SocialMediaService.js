'use strict';
var XingStrategy     = require('passport-xing').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var UsersService = require('./UsersService');
var ParamUtil   = require('../../util/ParamUtil');
var HttpUtil    = require('../../util/HttpUtil');
var JSONXMLUtil = require("../../util/JSONXMLUtil.js");
var OAuthUtil   = require("../../util/OAuthUtil.js");

var Error = require('../../models/Error');

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var SOCIAL_PATH = '/DataChallenge_1/UsersUnionViewModel/users';

/**
 *
 * @param {Object} req
 * @param {string} provider
 * @param {string} id
 * @param {string} accessToken
 * @param {string} refreshTokenOrSecret
 * @param {function} done
 */
function connectUser(req, provider, id, accessToken, refreshTokenOrSecret, done) {
	UsersService.getUserById(req.session.userId, function (user, err) {
		delete req.session.userId;
		if (!err) {
			switch (provider) {
				case 'xing':
					user.xingId           = id;
					user.xingAccessToken  = accessToken;
					user.xingAccessSecret = refreshTokenOrSecret;
					break;
				case 'linkedIn':
					user.linkedInAccessToken  = accessToken;
					user.linkedInId           = id;
					user.linkedInRefreshToken = refreshTokenOrSecret;
					break;
			}
			UsersService.updateUser(user, function (user, err) {
				if (!err) {
					done(user, true);
				}
				else {
					done(err);
				}
			});
		}
		else {
			done(err);
		}
	});
}

global.passport.use('xing-connect', new XingStrategy({
		consumerKey      : process.env.xing_app_id,
		consumerSecret   : process.env.xing_app_key,
		callbackURL      : 'http://localhost:9090/api/v1/users/connect/xing/callback',
		passReqToCallback: true
	},
	function (req, token, tokenSecret, profile, done) {
		connectUser(req, 'xing', profile.id, token, tokenSecret, done);
	}
));

global.passport.use('linkedIn-connect', new LinkedInStrategy({
	clientID         : process.env.linkedIn_app_id,
	clientSecret     : process.env.linkedIn_app_key,
	callbackURL      : "http://localhost:9090/api/v1/users/connect/linkedIn/callback",
	scope            : ['r_basicprofile'],
	state            : true,
	passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
	connectUser(req, 'linkedIn', profile.id, accessToken, refreshToken, done);
}));

var xing     = global.passport.authenticate('xing-connect', {session: true});
var linkedIn = global.passport.authenticate('linkedIn-connect', {session: true});


exports.usersIdConnectNetworkDELETE = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/
	UsersService.getUserById(args.id.value, function (existingUser, err) {
			if (!err) {
				switch (args.network.value) {
					case 'xing':
						existingUser.xingId           = 'NULL';
						existingUser.xingAccessToken  = 'NULL';
						existingUser.xingAccessSecret = 'NULL';
						break;
					case 'linkedIn':
						existingUser.linkedInId           = 'NULL';
						existingUser.linkedInAccessToken  = 'NULL';
						existingUser.linkedInRefreshToken = 'NULL';
						break;
				}
			}
		UsersService.createUser(existingUser, function (existingUser, err) {
				if (!err) {
					HttpUtil.sendResponse(res, 200, existingUser, res.req.accept()[0]);
				}
				else {
					HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
				}
			});
		}
	);
};

exports.usersConnectNetworkCallbackGET = function (args, req, res, next) {
	/**
	 * OAuth Callback
	 * Internal callback route for oauth connect processes
	 *
	 * network String network the user should be connected to
	 * no response value expected for this operation
	 **/
	switch (args.network.value) {
		case "linkedIn":
			return linkedIn(req, res, next);
			break;
		case "xing":
			return xing(req, res, next);
	}
};

exports.usersIdConnectNetworkGET = function (args, req, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/
	req.session.userId = args.id.value;
	switch (args.network.value) {
		case "linkedIn":
			return linkedIn(req, res, next);
		case "xing":
			return xing(req, res, next);
	}
	return null;
};

exports.getSocialUserById = function (network, id, user, cb) {
	var params = [network];
	switch (network) {
		case 'linkedIn':
			params.push(user.linkedInAccessToken);
			break;
		case 'xing':
			var request_data = {
				url   : "https://api.xing.com/v1/users/" + id,
				method: 'get'
			};
			params.push(id, user.xingAccessToken);
			params = OAuthUtil.createXingOAuthParams(user, request_data, params);

	}
	var path   = ParamUtil.buildPath(params);
	var config = new HttpUtil.Configuration(HOST, SOCIAL_PATH + path, 'get', PORT, true);

	HttpUtil.sendHttpRequest(config, false, cb);
};

exports.usersNetworkIdGET = function (args, req, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/
	exports.getSocialUserById(args.network.value, args.id.value, req.user, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'user');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});
}
;

exports.usersSearchGET = function (args, req, res, next) {
	/**
	 * parameters expected in the args:
	 * keywords (String)
	 **/
	var params = [];
	var request_data = {
		url   : "https://api.xing.com/v1/users/find",
		method: 'get'
	};

	params.push(req.user.xingAccessToken || 'NULL');
	params = OAuthUtil.createXingOAuthParams(req.user, request_data, params);
	params.push('first_name,last_name,employment_status,gender,professional_experience', args.keywords.value);

	var path         = ParamUtil.buildPath(params);
	var config       = new HttpUtil.Configuration(HOST, SOCIAL_PATH + path, 'get', PORT, true);

	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'users');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});
};

