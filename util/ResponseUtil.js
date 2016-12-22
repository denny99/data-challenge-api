/**
 * Created by admin on 20.12.16.
 */
var https = require('https');
var http  = require('http');
var _     = require('lodash');

var JSONXMLUtil = require('./JSONXMLUtil');
var Error = require('../models/Error');

/**
 * This callback is displayed as part of the Requester class.
 * @callback getResponseAsString~callback
 * @param {string} responseMessage
 * @param {Error} [err]
 */

/**
 * @class Configuration
 * @param {string} host
 * @param {string} path
 * @param {string} method (get,put,post, etc.)
 * @param {string} [port]
 * @param {boolean} [teiid]
 * @constructor
 */
module.exports.Configuration = function (host, path, method, port, teiid) {
	this.host   = host;
	this.path   = path;
	this.method = method;
	this.port   = port;

	if (teiid) {
		this.headers =
			{
				'Authorization': 'Basic ' + new Buffer(process.env.teiid_username + ':' + process.env.teiid_password).toString('base64')
			};
	}
};

/**
 *
 * @param {Configuration} config
 * @param {boolean} secure
 * @param {getResponseAsString~callback} cb
 */
module.exports.getResponseAsString = function (config, secure, cb) {
	function callback(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			var statusCode = response.statusCode || 200;
			if (statusCode >= 200 && statusCode <= 299) {
				cb(str);
			}
			else {
				var jbossError = getJBossError(str);
				if (jbossError) {
					statusCode = jbossError;
				}
				var error = new Error(statusCode, str, '');
				cb('', error);
			}
		});
	}

	(secure ? https : http).request(config, callback).on('error', function (e) {
		cb('', new Error(500, e.message, ''));
	}).end();
};

/**
 *
 * @param {Object} res
 * @param {number} statusCode
 * @param {Object | string} content
 * @param {string} contentType MIME Content Type
 * @param {string} [xmlParent]
 */
module.exports.sendResponse = function (res, statusCode, content, contentType, xmlParent) {
	if (content) {
		res.set('Content-Type', contentType);
		if (typeof content === 'object') {
			switch (contentType) {
				case 'application/xml':
					content = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + JSONXMLUtil.jsonToXMLSting(content, xmlParent);
					break;
				default:
					content = JSON.stringify(content);
					break;

			}
		}
		res.status(statusCode).end(content);
	}
	else {
		res.status(statusCode).end();
	}
};

/**
 *
 * @param {string} responseString
 * @return {Number}
 */
function getJBossError(responseString) {
	if (_.includes(responseString, 'TEIID50092')) {
		return 404;
	}
	//jboss always returns 200 and puts status in xml
	if (_.includes(responseString, 'HTTP Status')) {
		return parseInt(responseString.match(/\s\d+/)[0]);
	}
}