'use strict';

exports.usersNetworkIdAnalyzePOST = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 * id (String)
	 * network (String)
	 **/

		//TODO real db call

	var examples                 = {};
	examples['application/json'] = {
		"jobTitle"     : "aeiou",
		"salary_min"   : 1.3579000000000001069366817318950779736042022705078125,
		"salary_max"   : 1.3579000000000001069366817318950779736042022705078125,
		"salary_median": 1.3579000000000001069366817318950779736042022705078125
	};
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	}
	else {
		res.end();
	}

};

