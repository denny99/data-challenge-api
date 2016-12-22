'use strict';

exports.usersIdConnectNetworkDELETE = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
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

}

exports.usersNetworkIdGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/
	var examples                 = {};
	examples['application/json'] = {
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
	};
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	}
	else {
		res.end();
	}

}

