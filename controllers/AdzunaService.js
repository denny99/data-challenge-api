/**
 * Created by admin on 20.12.16.
 */
var _            = require('lodash');
var ResponseUtil = require("../util/responseUtil.js");

var SEARCH_URL  = "api.adzuna.com";
var SEARCH_PATH = _.template("/v1/api/jobs/<%= country %>/search/1");

module.exports.search = function search(req, res) {
	var config = {
		host: SEARCH_URL,
		path: SEARCH_PATH({'country': req.query.country})
	};

	config.path += "?";

	config.path += "app_id=" + req.query.appId;
	config.path += "&app_key=" + req.query.appKey;
	config.path += "&what=" + req.query.title;
	config.path += "&results_per_page=1000";
	config.path += "&salary_min=0";
	config.path += "&content-type=application/json";

	ResponseUtil.getResponseAsString(res, config);
};