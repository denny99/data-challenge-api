/**
 * Created by admin on 20.12.16.
 */
var ResponseUtil = require('../util/ResponseUtil.js');
var ParamUtil    = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.glassdoor.com';
var SEARCH_PATH = '/api/api.htm';

var API_VERSION = '1';
var FORMAT      = 'json';
var ACTION      = 'jobs-prog';

module.exports.estimate = function (req, res) {
	var config = new ResponseUtil.Configuration(SEARCH_URL, SEARCH_PATH, 'get');

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

	ResponseUtil.getResponseAsString(config, true, function (response, err) {
		if (!err) {
			ResponseUtil.sendResponse(res, 200, JSON.parse(response), 'application/xml', 'response');
		}
		else {
			ResponseUtil.sendResponse(res, err.code, err, 'application/xml', 'response');
		}
	});
};