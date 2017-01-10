'use strict';

var url = require('url');


var Analysis = require('./AnalysisService');


module.exports.usersNetworkIdAnalyzePOST = function usersNetworkIdAnalyzePOST(req, res, next) {
	Analysis.usersNetworkIdAnalyzePOST(req.swagger.params, res, next);
};
