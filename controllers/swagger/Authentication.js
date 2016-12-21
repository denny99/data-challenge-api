'use strict';

var url = require('url');


var Authentication = require('./AuthenticationService');


module.exports.usersAuthenticateGET = function usersAuthenticateGET(req, res, next) {
	Authentication.usersAuthenticateGET(req.swagger.params, res, next);
};

module.exports.usersIdConnectNetworkGET = function usersIdConnectNetworkGET(req, res, next) {
	Authentication.usersIdConnectNetworkGET(req.swagger.params, res, next);
};
