'use strict';

var _ = require('lodash');

var ParamUtil = require('../../util/ParamUtil');
var HttpUtil  = require('../../util/HttpUtil');
var JSONXMLUtil = require("../../util/JSONXMLUtil.js");

var User = require('../../models/User');

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var PATH = '/DataChallenge_1/LocalUserViewModel/users';

exports.usersGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 **/
	var examples                 = {};
	examples['application/json'] = [
		{
			"xingAccessToken"    : "aeiou",
			"password"           : "aeiou",
			"linkedInAccessToken": "aeiou",
			"xingId"             : "aeiou",
			"share"              : 1.3579000000000001069366817318950779736042022705078125,
			"userId"             : "aeiou",
			"username"           : "aeiou",
			"linkedInId"         : "aeiou"
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
	var path   = ParamUtil.buildPath([args.id.value]);
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'delete', PORT, true);
	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 201, undefined, res.req.accepts()[0]);
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});
};

exports.usersIdGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 **/

	var path   = ParamUtil.buildPath([args.id.value, 'basic']);
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'user');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
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
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

	var existingUser, mergedUser;

	//first get existing user
	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {

			//merge old and new values
			existingUser      = JSONXMLUtil.stringToJSON(response);
			mergedUser        = new User();
			mergedUser.userId = existingUser.userId;
			_.assignInWith(mergedUser, existingUser, args.user.value, function (objValue, srcValue, key) {
				//
				if (key === 'userId' || key === 'xingId' || key === 'xingAccessToken' || key === 'linkedInId' ||
					key === 'linkedInAccessToken') {
					return objValue || 'NULL';
				}
				else {
					return srcValue;
				}
			});
			var userList = [
				mergedUser.userId, mergedUser.share, mergedUser.username, mergedUser.password,
				mergedUser.xingId, mergedUser.xingAccessToken, mergedUser.linkedInId,
				mergedUser.linkedInAccessToken
			];

			//update user in db
			var pathUser   = ParamUtil.buildPath(userList);
			var configUser = new HttpUtil.Configuration(HOST, PATH + pathUser, 'put', PORT, true);
			HttpUtil.sendHttpRequest(configUser, false, function (response, err) {
				if (!err) {
					HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'user');
				}
				else {
					HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
				}
			})
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});

};

exports.usersPOST = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * provider (String)
	 * user (User) basic provider only
	 **/
	var user;

	switch (args.provider.value) {
		case 'basic':
			user = new User(args.user.value.share, args.user.value.username, args.user.value.password);
			break;
		case 'default':
			HttpUtil.sendResponse(res, 400, 'provider not supported', res.req.accepts()[0], 'error');
			break;
	}

	var path   = ParamUtil.buildPath([user.userId]);
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'post', PORT, true);
	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			var userList  = [
				user.userId, user.share, user.username, user.password, user.xingId,
				user.xingAccessToken, user.linkedInId, user.linkedInAccessToken
			];
			path          = ParamUtil.buildPath(userList);
			var newConfig = new HttpUtil.Configuration(HOST, PATH + path, 'put', PORT, true);
			HttpUtil.sendHttpRequest(newConfig, false, function (response, err) {
				if (!err) {
					HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'user');
				}
				else {
					HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
				}
			})

		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});


	//TODO get data from passport session @denny
};

