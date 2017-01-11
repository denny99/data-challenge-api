'use strict';
var UserService = require('./UserService');
var ParamUtil = require('../../util/ParamUtil');
var HttpUtil = require('../../util/HttpUtil');
var JSONXMLUtil = require("../../util/JSONXMLUtil.js");

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var USERS_PATH = '/DataChallenge_1/LocalUserViewModel/users';
var SOCIAL_PATH = '/DataChallenge_1/UsersUnionViewModel/users';


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
            UserService.persistUser(existingUser, function (existingUser, err) {
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

exports.usersNetworkIdGET = function (args, res, next) {
    /**
     * parameters expected in the args:
     * id (String)
     * network (String)
     **/
    var path = ParamUtil.buildPath([args.network.value, args.id.value]);
    var config = new HttpUtil.Configuration(HOST, SOCIAL_PATH + path, 'get', PORT, true);

    HttpUtil.sendHttpRequest(config, false, function (response, err) {
        if (!err) {
            HttpUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0], 'user');
            
        }
        else {
            HttpUtil.sendResponse(res, err.code, err, res.req.accepts()[0], 'error');
        }
    });
};

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

