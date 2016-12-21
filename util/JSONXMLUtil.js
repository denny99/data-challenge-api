/**
 * Created by admin on 21.12.16.
 */
var X2JS      = require('x2js');
var converter = new X2JS();

/**
 *
 * @param {string} string
 * @returns {Object}
 */
module.exports.stringToJSON = function (string) {
	return converter.xml2js(string);
};

/**
 *
 * @param {Object} obj
 * @param {string} [parent]
 * @returns {string}
 */
module.exports.jsonToXMLSting = function (obj, parent) {
	var tmp = {};
	if (parent) {
		tmp[parent] = obj;
	}
	else {
		tmp = obj;
	}
	return converter.js2xml(tmp);
};