/**
 * Created by admin on 21.12.16.
 */

/**
 *
 * @param {Object} keyValueMap
 * @return {string}
 */
module.exports.buildQuery = function (keyValueMap) {
	var result = '?';

	var keys = Object.keys(keyValueMap);

	keys.forEach(function (key, index) {
		result += key + '=' + encodeURI(keyValueMap[key]).replace('&', '%26');

		//add & for all elements except last one
		if (index < keys.length - 1) {
			result += '&';
		}
	});

	return result;
};

/**
 *
 * @param {[*]} values
 * @return {string}
 */
module.exports.buildPath = function (values) {
	var result = '/';

	values.forEach(function (value, index) {
		result += encodeURI(value).replace('&', '%26').replace('/', '%2F').replace(':', '%3A');

		//add / for all elements except last one
		if (index < values.length - 1) {
			result += '/';
		}
	});

	return result;
};