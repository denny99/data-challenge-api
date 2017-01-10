'use strict';

var _ = require('lodash');

var ParamUtil = require('../../util/ParamUtil');
var HttpUtil  = require('../../util/HttpUtil');
var JSONXMLUtil = require("../../util/JSONXMLUtil.js");

var User = require('../../models/User');

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var PATH = '/DataChallenge_1/LocalUserViewModel/users';

/**
 * @callback persistUserCb
 * @param {User} [user]
 * @param {Error} [err]
 */


/**
 *
 * @param args
 * @param res
 * @param next
 */
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

	var path   = ParamUtil.buildPath([args.id.value]);
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
			existingUser = JSONXMLUtil.stringToJSON(response);

			if (existingUser.password !== args.user.value.passwordRepeat) {
				return HttpUtil.sendResponse(res, 403, undefined, res.req.accepts()[0], 'error');
			}

			mergedUser        = new User();
			mergedUser.userId = existingUser.userId;

			//refresh with new data
			_.assignInWith(mergedUser, existingUser, args.user.value, function (objValue, srcValue, key) {
				//
				if (key === 'userId' || key === 'xingId' || key === 'xingAccessToken' || key === 'xingAccessSecret' ||
					key === 'linkedInId' ||
					key === 'linkedInAccessToken' || key === 'linkedInRefreshToken') {
					return objValue || 'NULL';
				}
				else {
					return srcValue;
				}
			});
			var userList = [
				mergedUser.userId, mergedUser.share, mergedUser.username, mergedUser.password,
				mergedUser.xingId, mergedUser.xingAccessToken, mergedUser.xingAccessSecret, mergedUser.linkedInId,
				mergedUser.linkedInAccessToken, mergedUser.linkedInRefreshToken
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

/**
 *
 * @param {User} user
 * @param {persistUserCb} cb
 */
exports.persistUser = function (user, cb) {
	var path   = ParamUtil.buildPath([user.userId]);
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'post', PORT, true);
	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			var userList  = [
				user.userId, user.share, user.username, user.password, user.xingId,
				user.xingAccessToken, user.xingAccessSecret, user.linkedInId, user.linkedInAccessToken,
				user.linkedInRefreshToken
			];
			path          = ParamUtil.buildPath(userList);
			var newConfig = new HttpUtil.Configuration(HOST, PATH + path, 'put', PORT, true);
			HttpUtil.sendHttpRequest(newConfig, false, function (response, err) {
				if (!err) {
					cb(JSONXMLUtil.stringToJSON(response));
				}
				else {
					cb(undefined, err);
				}
			})

		}
		else {
			cb(undefined, err);
		}
	});
};

exports.usersPOST = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * user (User)
	 **/
	var user = new User(args.user.value.share, args.user.value.username, args.user.value.password);

	exports.persistUser(user, function (user, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, user, res.req.accepts()[0], 'user');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});
};

