/**
 * Created by admin on 20.12.16.
 */
var ResponseUtil = require("../util/responseUtil.js");

var SEARCH_URL  = "api.xing.com";
var SEARCH_PATH = "/v1/users/";

module.exports.getById = function (req, res) {
	var config = {
		host: SEARCH_URL,
		path: SEARCH_PATH + req.query.id
	};

	config.path += "?";

	config.path += "fields=" + req.query.fields;
	config.path += "&oauth_consumer_key=" + encodeURI(req.query.oauthconsumerkey);
	config.path += "&oauth_token=" + encodeURI(req.query.oauthtoken);
	config.path += "&oauth_signature_method=" + encodeURI(req.query.oauthsignaturemethod);
	config.path += "&oauth_timestamp=" + encodeURI(req.query.oauthtimestamp);
	config.path += "&oauth_nonce=" + encodeURI(req.query.oauthnonce);
	config.path += "&oauth_version=" + encodeURI(req.query.oauthversion);
	config.path += "&oauth_signature=" + encodeURI(req.query.oauthsignature).replace("&", "%26");

	ResponseUtil.getResponseAsString(res, config);
};

module.exports.find = function (req, res) {
	var config = {
		host: SEARCH_URL,
		path: SEARCH_PATH + "find.json"
	};

	config.path += "?";

	config.path += "keywords=" + encodeURI(req.query.keywords);
	config.path += "&user_fields=" + encodeURI(req.query.userfields);
	config.path += "&limit=" + (req.query.limit || 100);
	config.path += "&oauth_consumer_key=" + encodeURI(req.query.oauthconsumerkey);
	config.path += "&oauth_token=" + encodeURI(req.query.oauthtoken);
	config.path += "&oauth_signature_method=" + encodeURI(req.query.oauthsignaturemethod);
	config.path += "&oauth_timestamp=" + encodeURI(req.query.oauthtimestamp);
	config.path += "&oauth_nonce=" + encodeURI(req.query.oauthnonce);
	config.path += "&oauth_version=" + encodeURI(req.query.oauthversion);
	config.path += "&oauth_signature=" + encodeURI(req.query.oauthsignature).replace("&", "%26");

	console.log(config.path);

	ResponseUtil.getResponseAsString(res, config);
};
