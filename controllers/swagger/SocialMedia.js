'use strict';

var url = require('url');


var SocialMedia = require('./SocialMediaService');


module.exports.usersIdConnectNetworkDELETE = function usersIdConnectNetworkDELETE(req, res, next) {
	SocialMedia.usersIdConnectNetworkDELETE(req.swagger.params, res, next);
};

module.exports.usersIdConnectNetworkGET = function usersIdConnectNetworkGET(req, res, next) {
	SocialMedia.usersIdConnectNetworkGET(req.swagger.params, res, next);
};

module.exports.usersNetworkIdGET = function usersNetworkIdGET(req, res, next) {
	SocialMedia.usersNetworkIdGET(req.swagger.params, res, next);
};

module.exports.usersSearchGET = function usersSearchGET(req, res, next) {
	SocialMedia.usersSearchGET(req.swagger.params, res, next);
};
