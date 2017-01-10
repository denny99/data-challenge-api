'use strict';
var passport     = require('passport');
var ParamUtil    = require('../../util/ParamUtil.js');
var ResponseUtil = require('../../util/ResponseUtil.js');
var JSONXMLUtil  = require('../../util/JSONXMLUtil.js');

var BasicStrategy    = require('passport-http').BasicStrategy;
var XingStrategy     = require('passport-xing').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').OAuth2Strategy;

var HOST       = process.env.vdb_host;
var PORT       = process.env.vdb_port;
var BASIC_PATH = '/DataChallenge_1/LocalUserViewModel/users';

passport.use(new BasicStrategy(
	function (userid, password, done) {
		var path   = ParamUtil.buildPath([userId, 'basic']);
		var config = new ResponseUtil.Configuration(HOST, BASIC_PATH + path, 'get', PORT, true);

		ResponseUtil.getResponseAsString(config, false, function (response, err) {
			if (!err) {
				var user = JSONXMLUtil.stringToJSON(response);
				if (!user) {
					return done(null, false);
				}
				if (user.password !== password) {
					return done(null, false);
				}
				else {
					return done(user, true);
				}
			}
			else {
				return done(err);
			}
		});
	}
));

exports.usersAuthenticateGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * provider (String)
	 * username (String)
	 * password (String)
	 **/
	var examples                 = {};
	examples['application/json'] = {
		"xingAccessToken"    : "aeiou",
		"password"           : "aeiou",
		"linkedInAccessToken": "aeiou",
		"xingId"             : "aeiou",
		"linkedInProfile"    : "aeiou",
		"id"                 : "aeiou",
		"username"           : "aeiou"
	};
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	}
	else {
		res.end();
	}

};

exports.usersIdConnectNetworkGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/
	var examples                 = {};
	examples['application/json'] = "aeiou";
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	}
	else {
		res.end();
	}

};

