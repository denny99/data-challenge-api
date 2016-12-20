'use strict';

var url = require('url');


var Users = require('./UsersService');


module.exports.usersAuthenticateGET = function usersAuthenticateGET(req, res, next) {
	Users.usersAuthenticateGET(req.swagger.params, res, next);
};

module.exports.usersGET = function usersGET(req, res, next) {
	Users.usersGET(req.swagger.params, res, next);
};

module.exports.usersIdConnectNetworkDELETE = function usersIdConnectNetworkDELETE(req, res, next) {
	Users.usersIdConnectNetworkDELETE(req.swagger.params, res, next);
};

module.exports.usersIdConnectNetworkGET = function usersIdConnectNetworkGET(req, res, next) {
	Users.usersIdConnectNetworkGET(req.swagger.params, res, next);
};

module.exports.usersIdDELETE = function usersIdDELETE(req, res, next) {
	Users.usersIdDELETE(req.swagger.params, res, next);
};

module.exports.usersIdGET = function usersIdGET(req, res, next) {
	Users.usersIdGET(req.swagger.params, res, next);
};

module.exports.usersIdPUT = function usersIdPUT(req, res, next) {
	Users.usersIdPUT(req.swagger.params, res, next);
};

module.exports.usersNetworkIdAnalyzePOST = function usersNetworkIdAnalyzePOST(req, res, next) {
	Users.usersNetworkIdAnalyzePOST(req.swagger.params, res, next);
};

module.exports.usersNetworkIdGET = function usersNetworkIdGET(req, res, next) {
	Users.usersNetworkIdGET(req.swagger.params, res, next);
};

module.exports.usersPOST = function usersPOST(req, res, next) {
	Users.usersPOST(req.swagger.params, res, next);
};
