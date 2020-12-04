"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const index_1 = require("./controllers/index");
const swagger_conf_1 = require("./config/swagger.conf");
const server = express_1.default();
// swagger 配置
const expressSwagger = require('express-swagger-generator')(server);
expressSwagger(swagger_conf_1.SwaggerConfig);
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
routing_controllers_1.useExpressServer(server, {
    // register created express server in routing-controllers
    controllers: [...index_1.Controllers] // and configure it the way you need (controllers, validation, etc.)
});
server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
