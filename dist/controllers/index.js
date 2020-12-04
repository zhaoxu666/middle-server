"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const list_1 = require("./modules/list");
const user_1 = require("./modules/user");
const login_1 = require("./modules/login");
exports.Controllers = [
    list_1.ListController,
    user_1.UserController,
    login_1.LoginController
];
