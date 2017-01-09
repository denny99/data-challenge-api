/**
 * Created by admin on 20.12.16.
 */
var HttpUtil = require('../util/HttpUtil.js');
var ParamUtil    = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.glassdoor.com';
var SEARCH_PATH = '/api/api.htm';

var API_VERSION = '1';
var FORMAT      = 'json';
var ACTION      = 'jobs-prog';

module.exports.estimate = function (req, res) {
	var config = new HttpUtil.Configuration(SEARCH_URL, SEARCH_PATH, 'get');

	config.path += ParamUtil.buildQuery({
		't.p'    : req.query.appId,
		't.k'    : req.query.appKey,
		jobTitle : req.query.title,
		countryId: req.query.countryId,
		userip   : req.query.userip,
		useragent: req.query.useragent,
		action   : ACTION,
		format   : FORMAT,
		v        : API_VERSION
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