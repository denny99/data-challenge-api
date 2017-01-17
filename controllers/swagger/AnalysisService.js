'use strict';

var SocialMediaService = require('./SocialMediaService');
var AuthenticationService         = require('./AuthenticationService');
var ParamUtil          = require('../../util/ParamUtil');
var HttpUtil           = require('../../util/HttpUtil');
var JSONXMLUtil        = require("../../util/JSONXMLUtil.js");
var TranslateUtil        = require("../../util/TranslateUtil.js");

TranslateUtil.translator("brennen");

var Error = require('../../models/Error');

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var BASIC_PATH                    = '/DataChallenge_1/JobsUnionViewModel/estimate';

exports.usersNetworkIdAnalyzePOST = function (args, req, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/

	SocialMediaService.getSocialUserById(args.network.value, args.id.value, req.user, function (re, err) {
		var socialUser = JSONXMLUtil.stringToJSON(re);
		AuthenticationService.findUser(socialUser.id, undefined, args.network.value, undefined, undefined,
			function (user, err) {
				if (!err || true) {
					if (user.share === 1 || req.user.userId === user.userId) {
						var path   = ParamUtil.buildPath([
							'de', socialUser.employment.title, process.env.adzuna_app_id, process.env.adzuna_app_key,
							process.env.glassdoor_app_id, req.headers['user-agent'], req.headers['host'],
							process.env.glassdoor_app_key, '1'
						]);
						var config = new HttpUtil.Configuration(HOST, BASIC_PATH + path, 'get', PORT, true);
						HttpUtil.sendHttpRequest(config, false, function (response, err) {
							if (!err) {
								HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response),
									res.req.accepts()[0], 'users');
							}
							else {
								HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
							}
						})
					}
					else {
						err = new Error(403, 'permission not granted');
						HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
					}
				}
				else {
					HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
				}
			})


	});
};

