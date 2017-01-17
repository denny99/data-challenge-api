'use strict';

var url = require('url');


var SocialMedia = require('./SocialMediaService');


module.exports.usersIdConnectNetworkDELETE = function usersIdConnectNetworkDELETE(req, res, next) {
	SocialMedia.usersIdConnectNetworkDELETE(req.swagger.params, res, next);
};

module.exports.usersIdConnectNetworkGET = function usersIdConnectNetworkGET(req, res, next) {
	SocialMedia.usersIdConnectNetworkGET(req.swagger.params, req, res, next);
};

module.exports.usersConnectNetworkCallbackGET = function usersConnectNetworkCallbackGET(req, res, next) {
	SocialMedia.usersConnectNetworkCallbackGET(req.swagger.params, req, res, function (obj) {
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

module.exports.usersNetworkIdGET = function usersNetworkIdGET(req, res, next) {
	SocialMedia.usersNetworkIdGET(req.swagger.params, req, res, next);
};

module.exports.usersSearchGET = function usersSearchGET(req, res, next) {
	SocialMedia.usersSearchGET(req.swagger.params, req, res, next);
};
