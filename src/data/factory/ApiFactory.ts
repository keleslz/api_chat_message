import { UserApi } from "../api/UsersApi"

export abstract class ApiFactory {
    static user() {
        return new UserApi()
    }
}