/**
 * Created by admin on 22.12.16.
 */
var uuidV4 = require('uuid/v4');

/**
 *
 * @param {number} [share
 * @param {string} [username]
 * @param {string} [password]
 * @param {string} [xingId]
 * @param {string} [xingAccessToken]
 * @param {string} [linkedInId]
 * @param {string} [linkedInAccessToken]
 * @constructor
 */
module.exports.User = function (share, username, password, xingId, xingAccessToken, linkedInId, linkedInAccessToken) {
	this.userId              = uuidV4();
	this.share               = share || 0;
	this.username            = username || 'NULL';
	this.password            = password || 'NULL';
	this.xingId              = xingId || 'NULL';
	this.xingAccessToken     = xingAccessToken || 'NULL';
	this.linkedInId          = linkedInId || 'NULL';
	this.linkedInAccessToken = linkedInAccessToken || 'NULL';
};