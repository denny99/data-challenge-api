'use strict';

var _ = require('lodash');

var ParamUtil    = require('../../util/ParamUtil');
var ResponseUtil = require('../../util/ResponseUtil');
var JSONXMLUtil  = require("../../util/JSONXMLUtil.js");

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var PATH = '/DataChallenge_1/LocalUserViewModel/users';

exports.usersGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * keywords (String)
	 **/
	var examples                 = {};
	examples['application/json'] = [
		{
			"gender"           : true,
			"last_name"        : "aeiou",
			"employment_status": "aeiou",
			"id"               : "aeiou",
			"employment"       : {
				"end_date"   : "aeiou",
				"begin_date" : "aeiou",
				"name"       : "aeiou",
				"description": "aeiou",
				"industry"   : "aeiou",
				"title"      : "aeiou"
			},
			"first_name"       : "aeiou"
		}
	];
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	}
	else {
		res.end();
	}

};

exports.usersIdDELETE = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 **/
	// no response value expected for this operation
	res.end();
};

exports.usersIdGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 **/

	var path   = ParamUtil.buildPath([args.id.value, 'basic']);
	var config = new ResponseUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

	ResponseUtil.getResponseAsString(config, false, function (response, err) {
		if (!err) {
			ResponseUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0]);
		}
		else {
			ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
		}
	});
};

exports.usersIdPUT = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * user (User)
	 **/

	var path   = ParamUtil.buildPath([args.id.value, 'basic']);
	var config = new ResponseUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

	var existingUser;

	ResponseUtil.getResponseAsString(config, false, function (response, err) {
		if (!err) {
			existingUser = JSONXMLUtil.stringToJSON(response);
			Object.keys(args.user.value).forEach(function (key) {
				existingUser[key] = args.user.value[key]
			});
			var pathUser = ParamUtil.buildPath([existingUser.userId, existingUser.share, existingUser.username, existingUser.password]);
			var configUser = new ResponseUtil.Configuration(HOST, PATH + pathUser, 'put', PORT, true);
			ResponseUtil.getResponseAsString(configUser, false, function (response, err) {
				if (!err) {
					ResponseUtil.sendResponse(res, 200, existingUser, res.req.accepts()[0]);
				}
				else {
					ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
			}
			})
		}
		else {
			ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
		}});

};

exports.usersPOST = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * provider (String)
	 * user (User) basic provider only
	 **/

		//TODO get data from passport session @denny (@jens setze vorerst alle social media params auf 'NULL')

		//TODO create new user @see models/User

		//TODO update new user with new data

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

}

