'use strict';

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
}

exports.usersIdGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
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
  
}

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

