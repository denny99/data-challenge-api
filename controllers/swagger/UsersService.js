'use strict';

var _ = require('lodash');

var ParamUtil = require('../../util/ParamUtil');
var ResponseUtil = require('../../util/ResponseUtil');
var JSONXMLUtil = require("../../util/JSONXMLUtil.js");

var User = require('../../models/User');

var HOST = process.env.vdb_host;
var PORT = process.env.vdb_port;
var PATH = '/DataChallenge_1/LocalUserViewModel/users';

exports.usersGET = function (args, res, next) {
    /**
     * parameters expected in the args:
     * keywords (String)
     **/
    var userGet =

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

};

exports.usersIdDELETE = function (args, res, next) {
    /**
     * parameters expected in the args:
     * id (String)
     **/
        // no response value expected for this operation
    var path = ParamUtil.buildPath([args.id.value]);
    var config = new ResponseUtil.Configuration(HOST, PATH + path, 'delete', PORT, true);
    ResponseUtil.getResponseAsString(config, false, function (response, err) {
        if (!err) {
            ResponseUtil.sendResponse(res, 201, "", res.req.accepts()[0]);
        }
        else {
            ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
        }
    });
};

exports.usersIdGET = function (args, res, next) {
    /**
     * parameters expected in the args:
     * id (String)
     **/

    var path = ParamUtil.buildPath([args.id.value, 'basic']);
    var config = new ResponseUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

    ResponseUtil.getResponseAsString(config, false, function (response, err) {
        if (!err) {
            ResponseUtil.sendResponse(res, 200, JSONXMLUtil.stringToJSON(response), res.req.accepts()[0]);
        }
        else {
            ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
        }
    });
};

exports.usersIdPUT = function (args, res, next) {
    /**
     * parameters expected in the args:
     * id (String)
     * user (User)
     **/

    var path = ParamUtil.buildPath([args.id.value, 'basic']);
    var config = new ResponseUtil.Configuration(HOST, PATH + path, 'get', PORT, true);

    var existingUser;

    ResponseUtil.getResponseAsString(config, false, function (response, err) {
        if (!err) {
            existingUser = JSONXMLUtil.stringToJSON(response);
            Object.keys(args.user.value).forEach(function (key) {
                if (key === 'xingId' || key === 'xingAccessToken' || key === 'linkedInId' || key === 'linkedInAccessToken') {
                    existingUser.user [key] = 'NULL'
                }
                else {
                    existingUser.user[key] = args.user.value[key]
                }
            });
            var userList = [];
            userList.push(existingUser.user.userId, existingUser.user.share, existingUser.user.username, existingUser.user.password, existingUser.user.xingId, existingUser.user.xingAccessToken, existingUser.user.linkedInId, existingUser.user.linkedInAccessToken);

            var pathUser = ParamUtil.buildPath(userList);
            var configUser = new ResponseUtil.Configuration(HOST, PATH + pathUser, 'put', PORT, true);
            ResponseUtil.getResponseAsString(configUser, false, function (response, err) {
                if (!err) {
                    ResponseUtil.sendResponse(res, 200, existingUser, res.req.accepts()[0]);
                }
                else {
                    ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
                }
            })
        }
        else {
            ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
        }
    });

};

exports.usersPOST = function (args, res, next) {
    /**
     * parameters expected in the args:
     * provider (String)
     * user (User) basic provider only
     **/

    var newUser = new User(args.user.value.share, args.user.value.username, args.user.value.password);
    var path = ParamUtil.buildPath([newUser.userId]);
    var config = new ResponseUtil.Configuration(HOST, PATH + path, 'post', PORT, true);

    ResponseUtil.getResponseAsString(config, false, function (response, err) {
        if (!err) {
            var userList = [];
            userList.push(newUser.userId, newUser.share, newUser.username, newUser.password, newUser.xingId, newUser.xingAccessToken, newUser.linkedInId, newUser.linkedInAccessToken);
            path = ParamUtil.buildPath(userList);
            var newConfig = new ResponseUtil.Configuration(HOST, PATH + path, 'put', PORT, true);
            ResponseUtil.getResponseAsString(newConfig, false, function(response, err) {
                ResponseUtil.sendResponse(res, 200, newUser, res.req.accepts()[0]);
            })

        }
        else {
            ResponseUtil.sendResponse(res, err.code, err, res.req.accepts()[0]);
        }
    });




    //TODO get data from passport session @denny (@jens setze vorerst alle social media params auf 'NULL')
}

