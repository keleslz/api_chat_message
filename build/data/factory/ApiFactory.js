"use strict";
var UserApi = require('../api/UsersApi.json').UserApi;
var ApiFactory = /** @class */ (function () {
    function ApiFactory() {
    }
    ApiFactory.getUsers = function () {
        return new UserApi();
    };
    return ApiFactory;
}());
module.exports.ApiFactory = ApiFactory;
