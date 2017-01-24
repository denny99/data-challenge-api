/**
 * Created by admin on 21.12.16.
 */
var X2JS      = require('x2js');
var converter = new X2JS({
	skipEmptyTextNodesForObj: false
});

/**
 *
 * @param {string} string
 * @returns {Object}
 */
module.exports.stringToJSON = function (string) {
	var result = converter.xml2js(string);
	return simplifyJSON(result);
};

function simplifyJSON(json) {
	var keys = Object.keys(json);
	if (keys.length !== 1) {
		return json;
	}
	else {
		return simplifyJSON(json[keys[0]]);
	}
}

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