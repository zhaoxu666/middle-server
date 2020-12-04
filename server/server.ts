import express from "express"
import bodyParser from "body-parser"
import "reflect-metadata"
import { useExpressServer } from "routing-controllers"
import { Controllers } from './controllers/index'
import { SwaggerConfig } from './config/swagger.conf'
import { secretOrKey } from './config/config'
import expressJWT from 'express-jwt'

const server = express();
// swagger 配置
const expressSwagger = require('express-swagger-generator')(server)

expressSwagger(SwaggerConfig)

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(expressJWT({
    secret: secretOrKey,  // 签名的密钥 或 PublicKey
    algorithms: ['HS256']
  }).unless({
    path: ['/login/login']  // 指定路径不经过 Token 解析
  }), (req:any, res: any, next:any) => {
      next()
  })

useExpressServer(server, {
  // register created express server in routing-controllers
  controllers: [...Controllers] // and configure it the way you need (controllers, validation, etc.)
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});