'use strict';
var SocialMedia = require('./SocialMediaService');
var AuthUtil = require('../../util/AuthUtil');

module.exports.usersIdConnectNetworkDELETE = function usersIdConnectNetworkDELETE(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		SocialMedia.usersIdConnectNetworkDELETE(req.swagger.params, res, next);
	});
};

module.exports.usersIdConnectNetworkGET = function usersIdConnectNetworkGET(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		SocialMedia.usersIdConnectNetworkGET(req.swagger.params, req, res, next);
	});
};

module.exports.usersConnectNetworkCallbackGET = function usersConnectNetworkCallbackGET(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		SocialMedia.usersConnectNetworkCallbackGET(req.swagger.params, req, res, function (obj) {
			if (obj.code && obj.message) {
				res.status(obj.code).end();
			}
			else {
				req.login(obj, function (err) {
					//TODO exchange to 204 for non demo
					//res.status(204).end(err);
					res.redirect('/profile');
				});
			}
		});
	});
};

module.exports.usersNetworkIdGET = function usersNetworkIdGET(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		SocialMedia.usersNetworkIdGET(req.swagger.params, req, res, next);
	});
};

module.exports.usersSearchGET = function usersSearchGET(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		SocialMedia.usersSearchGET(req.swagger.params, req, res, next);
	});
};
