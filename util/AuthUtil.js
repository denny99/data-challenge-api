/**
 * Created by admin on 24.01.17.
 */

exports.isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		res.status(403).send('authorization required');
	}
};