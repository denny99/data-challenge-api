'use strict';

var url = require('url');


var Users = require('./UsersService');


module.exports.usersGET = function usersGET(req, res, next) {
	Users.usersGET(req.swagger.params, res, next);
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

module.exports.usersPOST = function usersPOST(req, res, next) {
	Users.usersPOST(req.swagger.params, res, next);
};
