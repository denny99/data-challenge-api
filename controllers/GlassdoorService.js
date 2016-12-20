/**
 * Created by admin on 20.12.16.
 */
var ResponseUtil = require("../util/responseUtil.js");

var SEARCH_URL  = "api.glassdoor.com";
var SEARCH_PATH = "/api/api.htm";

var API_VERSION = "1";
var FORMAT      = "json";
var ACTION      = "jobs-prog";

module.exports.estimate = function (req, res) {
	var config = {
		host: SEARCH_URL,
		path: SEARCH_PATH
	};

	config.path += "?";

	config.path += "t.p=" + req.query.appId;
	config.path += "&t.k=" + req.query.appKey;
	config.path += "&jobTitle=" + req.query.title;
	config.path += "&countryId=" + req.query.countryId;
	config.path += "&userip=" + req.query.userip;
	config.path += "&useragent=" + req.query.useragent;
	config.path += "&action=" + ACTION;
	config.path += "&format=" + FORMAT;
	config.path += "&v=" + API_VERSION;

	ResponseUtil.getResponseAsString(res, config);
};