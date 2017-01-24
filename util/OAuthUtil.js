/**
 * Created by admin on 16.01.17.
 */
var crypto = require('crypto');
var OAuth  = require('oauth-1.0a');

/**
 *
 * @param base_string
 * @param key
 * @return {*}
 */
function hash(base_string, key) {
	return crypto.createHmac('sha1', key).update(base_string).digest('base64');
}

/**
 *
 * @param {User} user
 * @param {Configuration} request_data
 * @param {[Object]} params
 * @return {Object}
 */
exports.createXingOAuthParams = function (user, request_data, params) {
	var token       = {
		token : user.xingAccessToken,
		secret: user.xingAccessSecret
	};
	var oauth       = OAuth({
		consumer        : {
			key   : process.env.xing_app_id,
			secret: process.env.xing_app_key
		},
		signature_method: 'PLAINTEXT'
	});
	var credentials = oauth.authorize(request_data, token);
	params.push(credentials.oauth_signature_method, credentials.oauth_signature,
		credentials.oauth_consumer_key, credentials.oauth_nonce, credentials.oauth_version,
		credentials.oauth_timestamp);
	return params;
};