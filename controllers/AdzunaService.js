/**
 * Created by admin on 20.12.16.
 */
var _            = require('lodash');
var ResponseUtil = require('../util/ResponseUtil.js');
var ParamUtil    = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.adzuna.com';
var SEARCH_PATH = _.template('/v1/api/jobs/<%= country %>/search/1');

module.exports.search = function search(req, res) {
	var config = new ResponseUtil.Configuration(SEARCH_URL, SEARCH_PATH({'country': req.query.country}), 'get');

	config.path += ParamUtil.buildQuery({
		app_id          : req.query.appId,
		app_key         : req.query.appKey,
		what            : req.query.title,
		results_per_page: 1000,
		salary_min      : 0,
		'content-type'  : 'application/json'
	});

	ResponseUtil.getResponseAsString(config, true, function (statusCode, response) {
		ResponseUtil.sendResponse(res, statusCode, JSON.parse(response), 'application/xml', 'response');
	});
};