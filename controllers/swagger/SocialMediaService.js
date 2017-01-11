'use strict';
var crypto = require('crypto');
var OAuth = require('oauth-1.0a');

var XingStrategy     = require('passport-xing').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var UsersService = require('./UsersService');
var ParamUtil = require('../../util/ParamUtil');
var HttpUtil = require('../../util/HttpUtil');
var JSONXMLUtil = require("../../util/JSONXMLUtil.js");

var Error = require('../../models/Error');

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var USERS_PATH = '/DataChallenge_1/LocalUserViewModel/users';
var SOCIAL_PATH = '/DataChallenge_1/UsersUnionViewModel/users';

global.passport.use('xing-connect', new XingStrategy({
        consumerKey   : process.env.xing_app_id,
        consumerSecret: process.env.xing_app_key,
        callbackURL   : 'http://localhost:9090/api/v1/users/authenticate/xing/callback',
        passReqToCallback: true
    },
    function (req, token, tokenSecret, profile, done) {
        connectUser(req, 'xing', profile.id, token, tokenSecret, done);
    }
));

/**
 * 
 * @param {Object} req
 * @param {string} provider
 * @param {string} id
 * @param {string} accessToken
 * @param {string} refreshTokenOrSecret
 * @param {function} done
 */
function connectUser(req, provider, id, accessToken, refreshTokenOrSecret, done) {
    if (req.isAuthenticated()) {
        switch (provider){
            case 'xing':
                req.user.xingId = id;
                req.user.xingAccessToken = accessToken;
                req.user.xingAccessSecret = refreshTokenOrSecret;
                break;
            case 'linkedIn':
                req.user.linkedInAccessToken = accessToken;
                req.user.linkedInId = id;
                req.user.linkedInRefreshToken = refreshTokenOrSecret;
                break;
        }
        UsersService.persistUser(req.user, function(user, err) {
            if (!err) {
                done(user, true);
            }
            else {
                done(err);
            }
        })
    }
    else {
        done(new Error(403, "login required"))
    }
}


global.passport.use('linkedIn-connect', new LinkedInStrategy({
    clientID    : process.env.linkedIn_app_id,
    clientSecret: process.env.linkedIn_app_key,
    callbackURL : "http://localhost:9090/api/v1/users/authenticate/linkedIn/callback",
    scope       : ['r_basicprofile'],
    state       : true,
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    connectUser(req, 'linkedIn', profile.id, accessToken, refreshToken, done);
}));

var xing     = global.passport.authenticate('xing-connect', {session: true});
var linkedIn = global.passport.authenticate('linkedIn-connect', {session: true});


exports.usersIdConnectNetworkDELETE = function (args, res, next) {
    /**
     * parameters expected in the args:
     * id (String)
     * network (String)
     **/
    var path = ParamUtil.buildPath([args.id.value]);
    var config = new HttpUtil.Configuration(HOST, USERS_PATH + path, 'get', PORT, true);

    var existingUser;

    HttpUtil.sendHttpRequest(config, false, function (response, err) {
            existingUser = JSONXMLUtil.stringToJSON(response);
            if (!err) {
                switch (args.network.value) {
                    case 'xing':
                        existingUser.xingId = 'NULL';
                        existingUser.xingAccessToken = 'NULL';
                        existingUser.xingAccessSecret = 'NULL';
                        break;
                    case 'linkedIn':
                        existingUser.linkedInId = 'NULL';
                        existingUser.linkedInAccessToken = 'NULL';
                        existingUser.linkedInRefreshToken = 'NULL';
                        break;
                }
            }
            UsersService.persistUser(existingUser, function (existingUser, err) {
                if (!err) {
                    HttpUtil.sendResponse(res, 200, existingUser, res.req.accept()[0]);
                }
                else {
                    HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
                }
            });
        }
    );
};


exports.usersIdConnectNetworkGET = function (args, res, next) {



}

function hash(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
}

exports.usersNetworkIdGET = function (args, req, res, next) {
    /**
     * parameters expected in the args:
     * id (String)
     * network (String)
     **/
    var params = [args.network.value, args.id.value];
    switch (args.network.value) {
        case 'linkedIn':
            params.push(req.user.linkedInAccessToken);
            break;
        case 'xing':
            var token = {
                token: req.user.xingAccessToken,
                secret: req.user.xingAccessSecret
            };
            var request_data = {
                url: "https://api.xing.com/v1/users/" + args.id.value,
                method: 'get'
            }
            var oauth = OAuth({
                consumer: {
                    key: process.env.xing_app_key,
                    secret: process.env.xing_app_secret
                },
                signature_method: 'HMAC-SHA1',
                hash_function: hash
            });
            // test an VM
            var test = oauth.authorize(request_data, token);
    }
    var path = ParamUtil.buildPath(params);
    var config = new HttpUtil.Configuration(HOST, SOCIAL_PATH + path, 'get', PORT, true);

    HttpUtil.sendHttpRequest(config, false, function (response, err) {
        if (!err) {
            HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'user');


        }
        else {
            HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
        }
    });
}
;

exports.usersSearchGET = function (args, res, next) {
    /**
     * parameters expected in the args:
     * keywords (String)
     **/
    var examples = {};
    examples['application/json'] = [
        {
            "gender": true,
            "last_name": "aeiou",
            "employment_status": "aeiou",
            "id": "aeiou",
            "employment": {
                "end_date": "aeiou",
                "begin_date": "aeiou",
                "name": "aeiou",
                "description": "aeiou",
                "industry": "aeiou",
                "title": "aeiou"
            },
            "first_name": "aeiou"
        }
    ];
    if (Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    }
    else {
        res.end();
    }

}

