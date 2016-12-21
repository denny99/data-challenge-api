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
	examples['application/json'] = [{
		"gender"           : true,
		"last_name"        : "aeiou",
		"employment_status": "aeiou",
		"id"               : "aeiou",
		"employment"       : "{}",
		"first_name"       : "aeiou"
	}];
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	}
	else {
		res.end();
	}
  
}

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

	var path   = ParamUtil.buildPath([args.id.value]);
	var config = new ResponseUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

	ResponseUtil.getResponseAsString(config, false, function (statusCode, response) {
		ResponseUtil.sendResponse(res, statusCode, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0]);
	});
};

exports.usersIdPUT = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * user (User)
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

exports.usersPOST = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * user (User)
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
  
}

