"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, username, email, id) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.id = id;
    }
    getUsername() {
        return this.username;
    }
    getName() {
        return this.name;
    }
}
exports.default = User;
