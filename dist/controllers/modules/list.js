"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListController = void 0;
const routing_controllers_1 = require("routing-controllers");
let ListController = class ListController {
    getAll() {
        return [
            {
                id: 1,
                name: 'angular'
            },
            {
                id: 2,
                name: 'vue'
            },
            {
                id: 3,
                name: 'react'
            }
        ];
    }
};
__decorate([
    routing_controllers_1.Get('/list')
], ListController.prototype, "getAll", null);
ListController = __decorate([
    routing_controllers_1.JsonController()
], ListController);
exports.ListController = ListController;
