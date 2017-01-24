/**
 * Created by admin on 22.12.16.
 */
var uuidV4 = require('uuid/v4');
var _ = require('lodash');

/**
 * @class User
 * @property {string} share
 * @property {string} username
 * @property {string} password
 * @property {string} xingId
 * @property {string} xingAccessToken
 * @property {string} xingAccessSecret
 * @property {string} linkedInId
 * @property {string} linkedInAccessToken
 * @property {string} linkedInRefreshToken
 *
 * @param {string} [share]
 * @param {string} [username]
 * @param {string} [password]
 * @param {string} [xingId]
 * @param {string} [xingAccessToken]
 * @param {string} [xingAccessSecret]
 * @param {string} [linkedInId]
 * @param {string} [linkedInAccessToken]
 * @param {string} [linkedInRefreshToken]
 * @constructor
 */
module.exports =
	function User(share, username, password, xingId, xingAccessToken, xingAccessSecret, linkedInId, linkedInAccessToken,
				  linkedInRefreshToken) {
		this.userId               = uuidV4();
		this.share                = share || 0;
		this.username             = username || 'NULL';
		this.password             = password || 'NULL';
		this.xingId               = xingId || 'NULL';
		this.xingAccessToken      = xingAccessToken || 'NULL';
		this.xingAccessSecret     = xingAccessSecret || 'NULL';
		this.linkedInId           = linkedInId || 'NULL';
		this.linkedInAccessToken  = linkedInAccessToken || 'NULL';
		this.linkedInRefreshToken = linkedInRefreshToken || 'NULL';

		this.getPublicDoc = function () {
			var result = _.cloneDeep(this);
			delete result.password;
			delete result.xingAccessToken;
			delete result.linkedInAccessToken;

			return result;
		}
	};