/**
 * Created by admin on 20.12.16.
 */
var ResponseUtil = require('../util/ResponseUtil.js');
var ParamUtil    = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.xing.com';
var SEARCH_PATH = '/v1/users/';

module.exports.getById = function (req, res) {
	var config = new ResponseUtil.Configuration(SEARCH_URL, SEARCH_PATH + req.query.id, 'get');

	config.path += ParamUtil.buildQuery({
		fields                : req.query.userfields,
		oauth_consumer_key    : req.query.oauthconsumerkey,
		oauth_token           : req.query.oauthtoken,
		oauth_signature_method: req.query.oauthsignaturemethod,
		oauth_timestamp       : req.query.oauthtimestamp,
		oauth_nonce           : req.query.oauthnonce,
		oauth_version         : req.query.oauthversion,
		oauth_signature       : req.query.oauthsignature
	});

	ResponseUtil.getResponseAsString(config, true, function (response, err) {
		if (!err) {
			ResponseUtil.sendResponse(res, 200, JSON.parse(response), 'application/xml', 'response');
		}
		else {
			ResponseUtil.sendResponse(res, err.code, err, 'application/xml', 'response');
		}
	});
};

module.exports.find = function (req, res) {
	var config = new ResponseUtil.Configuration(SEARCH_URL, SEARCH_PATH + 'find.json', 'get');

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

	ResponseUtil.getResponseAsString(config, true, function (response, err) {
		if (!err) {
			ResponseUtil.sendResponse(res, 200, JSON.parse(response), 'application/xml', 'response');
		}
		else {
			ResponseUtil.sendResponse(res, err.code, err, 'application/xml', 'response');
		}
	});
};
