const { UserApi } = require('../api/UsersApi.json');

class ApiFactory {
    static getUsers() {
        return new UserApi()
    }
}

module.exports.ApiFactory = ApiFactory