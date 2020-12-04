import express from "express";
import bodyParser from "body-parser";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { Controllers } from './controllers/index';
import { SwaggerConfig } from './config/swagger.conf'
const server = express();
// swagger 配置
const expressSwagger = require('express-swagger-generator')(server)

expressSwagger(SwaggerConfig)

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(server, {
  // register created express server in routing-controllers
  controllers: [...Controllers] // and configure it the way you need (controllers, validation, etc.)
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});