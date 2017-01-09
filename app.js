var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var swaggerTools = require('swagger-tools');
var jsyaml       = require('js-yaml');
var fs           = require('fs');
var helmet = require('helmet');

var APIError     = require('./models/Error');
var ResponseUtil = require('./util/HttpUtil.js');

module.exports.init = function (cb) {

	var app = express();

// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(helmet());

	var translator = require("./routes/translator");
	app.use(translator);

	/**
	 * swagger configuration
	 */
	{
// swaggerRouter configuration
		var options = {
			swaggerUi  : '/swagger.json',
			controllers: './controllers/swagger',
			useStubs   : process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
		};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
		var spec       = fs.readFileSync('./api/swagger.yaml', 'utf8');
		var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
		swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
			// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
			app.use(middleware.swaggerMetadata());

			// Validate Swagger requests
			app.use(middleware.swaggerValidator());

			// Route validated requests to appropriate controller
			app.use(middleware.swaggerRouter(options));

			// Serve the Swagger documents and Swagger UI
			app.use(middleware.swaggerUi());

// catch 404 and forward to error handler
			app.use(function (req, res, next) {
				var err    = new Error('Not Found');
				err.code = 404;
				next(err);
			});

// error handler
			app.use(function (err, req, res, next) {
				// set locals, only providing error in development
				err                = new APIError(err.code, err.message, '');
				res.locals.message = err.message;
				res.locals.error   = req.app.get('env') === 'development' ? err : {};

				ResponseUtil.sendResponse(res, err.code, err, req.accepts()[0], 'response');
			});

			cb(app);
		});
	}
};
