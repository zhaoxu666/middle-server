# MVC EXPRESS TYPESCRIPT Project

## 搭建步骤

### 全局安装 typescrpt

```shell
    npm install -g typescript
```
*如果之前安装过，可以忽略此步骤*

### 安装依赖

```shell
    // 初始化项目
    npm init

    // 安装 express body-parser
    npm install --save express body-parser

    // 安装开发环境依赖 ts声明文件 开发环境工具
    npm install --save-de @types/body-parser @types/express ts-node nodemon typescript concurrently

    // 安装MVC依赖
    npm install --save reflect-metadata routing-controllers class-transformer class-validator

    // 初始化ts 配置文件
    tsc --init

```

### 配置ts 配置文件
`tsconfig.json`

```json
    {
        "compilerOptions": {
            "target": "ES2015",   
            "module": "commonjs",
            "outDir": "./dist",
            "strict": true,
            "esModuleInterop": true,
            "experimentalDecorators": true
        }
    }   
```

### 配置启动命令
`pageckage.json`

```json
  "scripts": {
    "dev:build": "tsc -w",
    "dev:start": "nodemon dist/server.js",
    "serve": "concurrently npm:dev:*"
  }
```

### 创建打包输出目录
在根目录上创建一个名为 `dist` 的文件夹

### 创建开发目录
在根目录创建一个名为 `server` 的文件夹

### 创建模型
`server/models/user.ts`

```ts
export default class User {

    username: String;
    name: String;
    email: String;
    id: Number

    constructor(name: String, username: String, email: String, id: Number) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.id = id
    }

    getUsername() {
        return this.username;
    }
    getName() {
        return this.name;
    }
}

```

### 创建Controller入口文件
创建 `server/contrtollers/index.ts`

```ts
import { UserController } from './modules/user';

export const Controllers = [
    UserController
]

```



### 创建Controller
创建 `server/controllers/modules/user.ts` 后续 `controller` 创建都要在 `modules` 文件夹下，然后将其引入入口文件中

```ts


import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import User from '../../models/user';

@JsonController()
export class UserController {
  userStore: User[];

  constructor() {
    this.userStore = [
      new User("James Coonce", "jcoonce", "james@none.com", 1),
      new User("Jim Coonce", "jimcoonce", "jim@none.com", 2),
      new User("Norman", "jcoonce", "norman@none.com", 3)
    ];
  }
  @Get("/users")
  getAll() {
    return this.userStore;
  }

  @Get("/users/:id")
  @OnUndefined(404)
  getOne(@Param("id") id: number) {
    console.log(typeof id)
    let users = [
      new User("James Coonce", "jcoonce", "james@none.com", 1),
      new User("Jim Coonce", "jimcoonce", "jim@none.com", 2),
      new User("Norman", "jcoonce", "norman@none.com", 3)
    ];

    let user = users.find(x => x.id == id);
    return user;
  }

  @Post("/users")
  post(@Body() user: any) {
    const newUser = new User(user.name, user.username, user.email, user.id);
    return newUser;
  }

  @Put("/users/:id")
  put(@Param("id") id: number, @Body() user: any) {
    let currentUser = this.userStore.find(x => x.id === id);
    if (currentUser != undefined) {
      currentUser.name = user.name;
      currentUser.username = user.username;
      currentUser.email = user.email;
      return currentUser;
    }

    return "No user found";
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
```

### 创建项目入口文件
`server/server.ts`

```ts
import express from "express";
import bodyParser from "body-parser";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";

import { Controllers } from './controllers/index';

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

useExpressServer(server, {
  // register created express server in routing-controllers
  controllers: [...Controllers] // and configure it the way you need (controllers, validation, etc.)
})

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
```

### 启动项目

```shell
    npm run serve
```

打开浏览器 `localhost:3000/users` 可以查看


## 集成SWAGGER

### 安装依赖

```shell
    npm install express-swagger-generator --save-dev
```

### 配置文件

`server/config/swagger.conf.ts`

```ts
export const SwaggerConfig = {
    swaggerDefinition: {
        info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0'
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
          JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: ''
          }
        }
      },
      route: {
        url: '/swagger',
        docs: '/swagger.json' //swagger文件 api
      },
      basedir: __dirname, //app absolute path
      files: ['../controllers/modules/*.js'] //Path to the API handle folder
}

```

### 引入项目

更改根目录 `server.ts` 文件

```ts
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

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(server, {
  // register created express server in routing-controllers
  controllers: [...Controllers] // and configure it the way you need (controllers, validation, etc.)
})

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
```

### 添加API

示例 `server/controllers/modules/user.ts`
将下面注释内容 放在 `getAll` 方法上方

```ts
/**
 * 获取所有用户
 * @route GET /users
 * @group user - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

  @Get("/users")
  getAll() {
    return this.userStore;
  }
```

### 查看Swagger
启动项目，访问 `localhost:3000/swagger`


## 集成 TOKEN

### 安装依赖

```shell
    // 安装 jsonwebtoken 生成token express-jwt 验证token
    npm install --save jsonwebtoken express-jwt

    // ts声明文件
    npm install --save-devv @types/jsonwebtoken @types/express-jwt
```

### 添加配置

创建 `server/config/config.ts` 文件

```ts
export const secretOrKey = 'secret'
```

### 集成项目

`server/server.ts`

```ts
import expressJWT from 'express-jwt'
import { secretOrKey } from './config/config'

// 添加中间件
server.use(expressJWT({
    secret: secretOrKey,  // 签名的密钥 或 PublicKey
    algorithms: ['HS256']
  }).unless({
    path: ['/login/login']  // 指定路径不经过 Token 解析
  }), (req:any, res: any, next:any) => {
      next()
  })

```

添加登录 Controller `server/controllers/modules/login.ts`

```ts
import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import UserInfo from '../../models/login'
import jwt  from 'jsonwebtoken'
import { secretOrKey } from '../../config/config'
@JsonController()
export class LoginController {
    @Post("/login/login")
    login(@Body() userInfo: UserInfo) {
        let { username } = userInfo
        if (username) {
            let payload = {
                id:123,
                username: username
            }
            const token = jwt.sign(payload, secretOrKey, {expiresIn:  3600})
            return { token: 'Bearer ' + token, code: 200 }
        }
    }

}

```

将 `LoginController` 集成进入口文件中

```ts
// server/controllers/index.ts

import { ListController } from './modules/list';
import { UserController } from './modules/user';
import { LoginController } from './modules/login';
export const Controllers = [
    ListController,
    UserController,
    LoginController
]
```
### 使用

用 `PostMan 先调用 http://localhost:3000/login/login` post接口，得到 token，
在用获取到的token 调用 `http://localhost:3000/users` get接口，添加上请求头 `Authorization`: `获取的token值`
验证通过会返回 所有用户信息