/**
 * Created by admin on 20.12.16.
 */
var HttpUtil = require('../util/HttpUtil.js');
var ParamUtil    = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.xing.com';
var SEARCH_PATH = '/v1/users/';

module.exports.getById = function (req, res) {
	var config = new HttpUtil.Configuration(SEARCH_URL, SEARCH_PATH + req.query.id, 'get');

	config.path += ParamUtil.buildQuery({
		oauth_consumer_key    : req.query.oauthconsumerkey,
		oauth_token           : req.query.oauthtoken,
		oauth_signature_method: req.query.oauthsignaturemethod,
		oauth_timestamp       : req.query.oauthtimestamp,
		oauth_nonce           : req.query.oauthnonce,
		oauth_version         : req.query.oauthversion,
		oauth_signature       : req.query.oauthsignature
	});

	HttpUtil.sendHttpRequest(config, true, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, JSON.parse(response), 'application/xml', 'response');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, 'application/xml', 'response');
		}
	});
};

module.exports.find = function (req, res) {
	var config = new HttpUtil.Configuration(SEARCH_URL, SEARCH_PATH + 'find.json', 'get');

	config.path += ParamUtil.buildQuery(
		{
			keywords              : req.query.keywords,
			user_fields           : req.query.userfields,
			limit                 : req.query.limit || 100,
			oauth_consumer_key    : req.query.oauthconsumerkey,
			oauth_token           : req.query.oauthtoken,
			oauth_signature_method: req.query.oauthsignaturemethod,
			oauth_timestamp       : req.query.oauthtimestamp,
			oauth_nonce           : req.query.oauthnonce,
			oauth_version         : req.query.oauthversion,
			oauth_signature       : req.query.oauthsignature
		});

	HttpUtil.sendHttpRequest(config, true, function (response, err) {
		if (!err) {
			HttpUtil.sendResponse(res, 200, JSON.parse(response), 'application/xml', 'response');
		}
		else {
			HttpUtil.sendResponse(res, err.code, err, 'application/xml', 'response');
		}
	});
};
