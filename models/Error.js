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
module.exports = function Error(code, message, fields) {
	this.code    = resolveCode(code);
	this.message = message;
	this.fields  = fields;

	function resolveCode(code) {
		if (typeof code === 'number') {
			return code;
		}
		if (code === 'REQUIRED') {
			return 400;
		}
	}
};