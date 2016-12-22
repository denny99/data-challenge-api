/**
 * Created by admin on 22.12.16.
 */

/**
 * @class Error
 * @param {number} code
 * @param {string} message
 * @param {string} [fields]
 * @constructor
 */
module.exports.Error = function (code, message, fields) {
	this.code    = code;
	this.message = message;
	this.fields  = fields;
};