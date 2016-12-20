/**
 * Created by admin on 20.12.16.
 */
var http    = require('http');
var _       = require('lodash');
var EasyXml = require('easyxml');

var serializer = new EasyXml({
	singularize: true,
	rootElement: 'response',
	dateFormat : 'ISO',
	manifest   : true
});

function getResponseAsString(res, config) {
	var callback = function (response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			var statusCode = response.statusCode || 200;
			if (_.isEmpty(str)) {
				res.status(statusCode).end();
			}
			else {
				res.set('Content-Type', 'application/xml');
				res.send(serializer.render(JSON.parse(str))).status(statusCode).end();
			}
		});
	};

	http.request(config, callback).end();
}

module.exports = {
	getResponseAsString: getResponseAsString
};