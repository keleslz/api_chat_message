"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApi = void 0;
var fs_1 = __importDefault(require("fs"));
var UserApi = /** @class */ (function () {
    function UserApi() {
        this.source = './Users.json';
    }
    UserApi.prototype.getAll = function () {
        var content = fs_1.default.readFileSync(this.source);
        console.log(content, 'content');
        return new Map();
    };
    UserApi.prototype.getBy = function () {
        var content = fs_1.default.readFileSync(this.source);
        console.log(content, 'content');
        return new Map();
    };
    return UserApi;
}());
exports.UserApi = UserApi;
