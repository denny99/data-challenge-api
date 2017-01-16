/**
 * Created by admin on 20.12.16.
 */
var HttpUtil  = require('../util/HttpUtil.js');
var ParamUtil = require('../util/ParamUtil.js');

var SEARCH_URL  = 'api.linkedin.com';
var SEARCH_PATH = '/v1/people/~';

module.exports.getMe = function (req, res) {
	var config = new HttpUtil.Configuration(SEARCH_URL, SEARCH_PATH +
		':(id,first-name,last-name,positions)?format=json', 'get');

	config.headers =
		{
			'Authorization': 'Bearer ' + req.query.accessToken
		};

	HttpUtil.sendHttpRequest(config, true, function (response, err) {
		if (!err) {
			var user = JSON.parse(response);

			if (user.positions.values.length > 0) {
				user.positions         = user.positions.values[0];
				user.employment_status = true;

				if (user.positions.startDate) {
					var startDate = new Date();
					startDate.setMonth(user.positions.startDate.month - 1, 1);
					startDate.setYear(user.positions.startDate.year);
					user.positions.startDate = startDate.toISOString();
				}
				if (user.positions.endDate) {
					var endDate = new Date();
					startDate.setMonth(user.positions.endDate.month - 1, 1);
					startDate.setYear(user.positions.endDate.year);
					user.positions.endDate = endDate.toISOString();
				}
			}
			else {
				user.employment_status = false;
			}
			HttpUtil.sendResponse(res, 200, user, 'application/xml', 'response');
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
