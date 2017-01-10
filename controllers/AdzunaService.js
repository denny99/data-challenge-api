/**
 * Created by admin on 20.12.16.
 */
var _            = require('lodash');
var HttpUtil = require('../util/HttpUtil.js');
var ParamUtil    = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.adzuna.com';
var SEARCH_PATH = _.template('/v1/api/jobs/<%= country %>/search/1');

module.exports.search = function search(req, res) {
	var config = new HttpUtil.Configuration(SEARCH_URL, SEARCH_PATH({'country': req.query.country}), 'get');

	config.path += ParamUtil.buildQuery({
		app_id          : req.query.appId,
		app_key         : req.query.appKey,
		what            : req.query.title,
		results_per_page: 1000,
		salary_min      : 0,
		'content-type'  : 'application/json'
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