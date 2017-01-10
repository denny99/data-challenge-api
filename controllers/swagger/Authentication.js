'use strict';

var url = require('url');


var Authentication = require('./AuthenticationService');


module.exports.usersAuthenticateGET = function usersAuthenticateGET(req, res, next) {
	Authentication.usersAuthenticateGET(req.swagger.params, req, res, function (err) {
		res.status(204).end();
	});
};

module.exports.usersAuthenticateProviderCallbackGET = function usersAuthenticateProviderCallbackGET(req, res, next) {
	Authentication.usersAuthenticateProviderCallbackGET(req.swagger.params, req, res, function (err) {
		res.status(204).end();
	});
};
