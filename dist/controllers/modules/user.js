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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const user_1 = __importDefault(require("../../models/user"));
let UserController = class UserController {
    constructor() {
        this.userStore = [
            new user_1.default("James Coonce", "jcoonce", "james@none.com", 1),
            new user_1.default("Jim Coonce", "jimcoonce", "jim@none.com", 2),
            new user_1.default("Norman", "jcoonce", "norman@none.com", 3)
        ];
    }
    /**
     * 获取所有用户
     * @route GET /users
     * @group user - Operations about user
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    getAll() {
        return this.userStore;
    }
    getOne(id) {
        let users = [
            new user_1.default("James Coonce", "jcoonce", "james@none.com", 1),
            new user_1.default("Jim Coonce", "jimcoonce", "jim@none.com", 2),
            new user_1.default("Norman", "jcoonce", "norman@none.com", 3)
        ];
        let user = users.find(x => x.id == id);
        return user;
    }
    post(user) {
        const newUser = new user_1.default(user.name, user.username, user.email, user.id);
        return newUser;
    }
    put(id, user) {
        let currentUser = this.userStore.find(x => x.id === id);
        if (currentUser != undefined) {
            currentUser.name = user.name;
            currentUser.username = user.username;
            currentUser.email = user.email;
            return currentUser;
        }
        return "No user found";
    }
    remove(id) {
        return "Removing user...";
    }
};
__decorate([
    routing_controllers_1.Get("/users")
], UserController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/users/:id"),
    routing_controllers_1.OnUndefined(404),
    __param(0, routing_controllers_1.Param("id"))
], UserController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post("/users"),
    __param(0, routing_controllers_1.Body())
], UserController.prototype, "post", null);
__decorate([
    routing_controllers_1.Put("/users/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body())
], UserController.prototype, "put", null);
__decorate([
    routing_controllers_1.Delete("/users/:id"),
    __param(0, routing_controllers_1.Param("id"))
], UserController.prototype, "remove", null);
UserController = __decorate([
    routing_controllers_1.JsonController()
], UserController);
exports.UserController = UserController;
