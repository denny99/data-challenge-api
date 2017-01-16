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
 * @callback userCb
 * @param {User} [user]
 * @param {Error} [err]
 */


/**
 *
 * @param {string} id
 * @param {userCb} cb
 */
exports.getUserById = function (id, cb) {
	var path   = ParamUtil.buildPath([id]);
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		cb(JSONXMLUtil.stringToJSON(response), err);
	});
};


/**
 *
 * @param {User} user
 * @param {userCb} cb
 */
exports.createUser = function (user, cb) {
	var path   = ParamUtil.buildPath([user.userId]);
	var config = new HttpUtil.Configuration(HOST, PATH + path, 'post', PORT, true);
	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			exports.updateUser(user, cb);
		}
		else {
			cb(undefined, err);
		}
	});
};

/**
 *
 * @param {User} user
 * @param {userCb} cb
 */
exports.updateUser = function (user, cb) {
	var userList  = [
		user.userId, user.share, user.username || 'NULL', user.password || 'NULL', user.xingId || 'NULL',
		user.xingAccessToken || 'NULL', user.xingAccessSecret || 'NULL', user.linkedInId || 'NULL',
		user.linkedInAccessToken || 'NULL',
		user.linkedInRefreshToken || 'NULL'
	];
	var path      = ParamUtil.buildPath(userList);
	var newConfig = new HttpUtil.Configuration(HOST, PATH + path, 'put', PORT, true);
	HttpUtil.sendHttpRequest(newConfig, false, function (response, err) {
		if (!err) {
			cb(JSONXMLUtil.stringToJSON(response));
		}
		else {
			cb(undefined, err);
		}
	});
};

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
	var config = new HttpUtil.Configuration(Host, PATH, 'get', PORT, true);
	HttpUtil.sendHttpRequest(config, false, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accept()[0]);
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});
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
	exports.getUserById(args.id.value, function (user, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, user, res.req.accepts()[0], 'user');
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

	exports.getUserById(args.id.value, function (existingUser, err) {
		if (!err) {
			//merge old and new values

			if (existingUser.password !== args.user.value.passwordRepeat) {
				return HttpUtil.sendResponse(res, 403, undefined, res.req.accepts()[0], 'error');
			}

			var mergedUser    = new User();
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
			exports.updateUser(mergedUser, function (user, err) {
				if (!err) {
					HttpUtil.sendResponse(res, 200, user, res.req.accepts()[0], 'user');
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
	 * user (User)
	 **/
	var user = new User(args.user.value.share, args.user.value.username, args.user.value.password);

	exports.createUser(user, function (user, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, user, res.req.accepts()[0], 'user');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
		}
	});
};

