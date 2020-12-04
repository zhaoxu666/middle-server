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

## 连接配置中心

### 创建 request 和 nodeManger 工具类
`server/utils/request.ts` 和 `server/utils/nodeManager.ts`

### 安装依赖

```shell
    npm install --save axios redis

    npm install --save-dev @types/axios @types/redis
```

### 创建Redis 配置
`server/config/config.ts`

```ts
interface RedisConfigDto {
    ConfigCenterServiceAddress: string
    ConfigCenterPassword: string
    SystemType: string|number
    NodeConfigChanged: string
    RedisEventBus: string
}

export const RedisConfig : RedisConfigDto = {
    ConfigCenterServiceAddress: 'http://xx.xxx.xxx.xxx:xxx/api/ConigCenter/GetNode',
    ConfigCenterPassword: "xxxx",
    SystemType: 0,
    NodeConfigChanged: "xxxx",
    RedisEventBus: 'xxxxx'
}
```

### 编写代码

```ts
// request.ts
import axios from 'axios'
// 创建axios 实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url 配置baseURL
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout 超时时间
})

// 请求拦截
service.interceptors.request.use(
    <T>(config: T): T => {
      return config
    },
    (error: any) => {
      console.log(error) // for debug
      return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    (response: any) => {
      const res = response.data
      return res
    },
    (error: any) => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
  )
  
  export default service

```

```ts
// nodeManager.ts


import request from './request'
import redis from 'redis'
import { RedisConfig } from '../config/config'

interface NodeCacheValue {
    host: string,
    port: number,
    password: string
}

interface NodeDto {
    NodeTypeId: number,
    TypeName: string,
    Id: number,
    Name: string,
    Others: string,
    Address: string,
    Emails: string,
    RemoteAddress: string
}

const NodeCache: Map<string, NodeDto> = new Map()

async function getNode(theNodeName:string) {
    var nodeName = theNodeName.trim()
    let cacheKey = ''
    let index = 0;
    //避免传入了ApplicationGlobal.CurrentNodeName
    //已经有冒号就不用再添加systemType
    if ((index=nodeName.indexOf(":")) > -1) {
        cacheKey = nodeName;
        nodeName = nodeName.substring(0, index);
    } else {
        if ((RedisConfig.SystemType !== '') && RedisConfig.SystemType !== "0") {
            cacheKey = nodeName + ":" + RedisConfig.SystemType;
        } else {
            cacheKey = nodeName;
        }
    }
    if (NodeCache.has(cacheKey)){
        return NodeCache.get(cacheKey)!
    } else {
        let data  = await requestConfigCenter(nodeName,cacheKey)
        return data
    }
}

function requestConfigCenter (nodeName:string, cacheKey:string): Promise<any> {
    return new Promise(( resolve, reject ) => {
        request({
            url: RedisConfig.ConfigCenterServiceAddress,
            method: 'GET',
            params: {
              password: RedisConfig.ConfigCenterPassword,
              nodeName: nodeName,
              systemType: RedisConfig.SystemType
            }
          })
          .then((data:any) => {
            if (!data.Address) { reject() }
            // 处理地址字段 获取到 redis 端口，地址， 密码
            NodeCache.set(cacheKey, data)
            resolve(data)
          })
          .catch((err:any) => {
            reject(err)
          })
    })
}

function handleRedisAddress (address:string):NodeCacheValue {
    if (!address) throw new Error('address is required')
    let array = address.split(',');
    let passwordItem;
    let hostportItem;

    for (const item of array) {
        if (item.indexOf("password") > -1) {
            passwordItem = item;
        } else if (item.indexOf(':') > -1) {
            hostportItem = item;
        }
    }

    let hostportItemArray: Array<string> = [];
    if (hostportItem != null) {
        hostportItemArray = hostportItem.split(':');
    }

    let password:string = '';
    if (passwordItem != null) {
        password = passwordItem.split('=')[1];
    }

    let host = hostportItemArray[0].trim();
    let port:number = Number(hostportItemArray[1].trim());
    return { host, port, password }
 }

class NodeManager {
    constructor(){
        getRedis()
    }
    public GetNode(theNodeName:string) {
        return getNode(theNodeName)
    }
}

 
async function getRedis(){
    let redisNode = await getNode(RedisConfig.RedisEventBus)
    let {port, host, password } = handleRedisAddress(redisNode.Address)
    let client = redis.createClient(port, host)
    let publisher = redis.createClient(port, host)
    publisher.auth(password, function () {
        console.log("redis publisher connected!");
    })
    client.auth(password, function () {
        console.log("redis client connected!");
    });

     //客户端连接redis成功后执行回调
     client.on("ready",  () => {
        //订阅消息
        client.subscribe(RedisConfig.NodeConfigChanged);
        console.log("订阅成功。。。");
    });
    
    client.on("error", (error: any) => {
        console.log("Redis Error " + error);
    });

    //监听订阅成功事件
    client.on("subscribe", (channel:string, count:any) => {
        console.log("this.client subscribed to " + channel + "," + count + "total subscriptions");
    });

    //收到消息后执行回调，message是redis发布的消息
    client.on("message",  (channel:string, nodeName:string) => {
        console.log("我接收到信息了");
        console.log(NodeCache.get(nodeName))
        // 添加到本地缓存
        NodeCache.delete(nodeName)
        console.log(NodeCache.get(nodeName))
    });

    //监听取消订阅事件
    client.on("unsubscribe",  (channel:string, count:any) => {
        console.log("this.client unsubscribed from" + channel + ", " + count + " total subscriptions")
    });

}


let nodeManager = new NodeManager()

export default nodeManager
```

### 项目启动获取配置中心（使用）

```ts
// server.ts
import NodeManager from './utils/nodeManager'

// 放在 jwt 之前
server.use('/', async (req, res) => {
    let info = await NodeManager.GetNode('Redis.TempData')
    res.send(JSON.stringify(info))
})

```