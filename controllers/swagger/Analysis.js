'use strict';
var Analysis = require('./AnalysisService');
var AuthUtil = require('../../util/AuthUtil');


module.exports.usersNetworkIdAnalyzeGET = function usersNetworkIdAnalyzePOST(req, res, next) {
	AuthUtil.isAuthenticated(req, res, function () {
		Analysis.usersNetworkIdAnalyzeGET(req.swagger.params, req, res, next);
	});
};
