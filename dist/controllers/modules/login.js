"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const routing_controllers_1 = require("routing-controllers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
let LoginController = class LoginController {
    login(userInfo) {
        let { username } = userInfo;
        if (username) {
            let payload = {
                id: 123,
                username: username
            };
            const token = jsonwebtoken_1.default.sign(payload, config_1.secretOrKey, { expiresIn: 3600 });
            return { token: 'Bearer ' + token, code: 200 };
        }
    }
};
__decorate([
    routing_controllers_1.Post("/login"),
    __param(0, routing_controllers_1.Body())
], LoginController.prototype, "login", null);
LoginController = __decorate([
    routing_controllers_1.JsonController("/login")
], LoginController);
exports.LoginController = LoginController;
