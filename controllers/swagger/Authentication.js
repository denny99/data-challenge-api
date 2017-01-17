'use strict';

var url = require('url');


var Authentication = require('./AuthenticationService');


module.exports.usersAuthenticateGET = function usersAuthenticateGET(req, res, next) {
	Authentication.usersAuthenticateGET(req.swagger.params, req, res, function (obj) {
		if (obj.code && obj.message) {
			res.status(obj.code).end();
		}
		else {
			req.login(obj, function (err) {
				res.status(204).end(err);
			});
		}
	});
};

module.exports.usersAuthenticateProviderCallbackGET = function usersAuthenticateProviderCallbackGET(req, res, next) {
	Authentication.usersAuthenticateProviderCallbackGET(req.swagger.params, req, res, function (obj) {
		if (obj.code && obj.message) {
			res.status(obj.code).end();
		}
		else {
			req.login(obj, function (err) {
				res.redirect('/profile');
			});
		}
	});
};
