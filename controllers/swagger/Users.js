'use strict';
var Users    = require('./UsersService');
var AuthUtil = require('../../util/AuthUtil');

module.exports.usersGET = function usersGET(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		Users.usersGET(req.swagger.params, res, next);
	});
};

module.exports.usersIdDELETE = function usersIdDELETE(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		Users.usersIdDELETE(req.swagger.params, res, next);
	});
};

module.exports.usersIdGET = function usersIdGET(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		Users.usersIdGET(req.swagger.params, res, next);
	});
};

module.exports.usersIdPUT = function usersIdPUT(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		Users.usersIdPUT(req.swagger.params, res, next);
	});
};

module.exports.usersPOST = function usersPOST(req, res, next) {
	Users.usersPOST(req.swagger.params, res, next);
};