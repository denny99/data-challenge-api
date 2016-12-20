/**
 * Created by admin on 20.12.16.
 */
var ResponseUtil = require("../util/responseUtil.js");

var SEARCH_URL  = "api.xing.com";
var SEARCH_PATH = "/v1/users/";

module.exports.getById = function (req, res) {
	var config = {
		host: SEARCH_URL,
		path: SEARCH_PATH
	};

	config.path += "?";

	config.path += "fields=" + req.query.fields;
	config.path += "&oauth_consumer_key=" + req.query.oauthconsumerkey;
	config.path += "&oauth_token=" + req.query.oauthtoken;
	config.path += "&oauth_signature_method=" + req.query.oauthsignaturemethod;
	config.path += "&oauth_timestamp=" + req.query.oauthtimestamp;
	config.path += "&oauth_nonce=" + req.query.oauthnonce;
	config.path += "&oauth_version=" + req.query.oauthversion;
	config.path += "&oauth_signature=" + req.query.oauthsignature;

	ResponseUtil.getResponseAsString(res, config);
};
