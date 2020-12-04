# 装饰器 API 文档

## Controller 装饰器

| 装饰器                            | 示例                                               | 描述                                                         |
| --------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| @Controller(baseRoute:string)     | @Controller("/users") class  SomeController        | 此装饰标记的类注册为Controller，带上参数后，表示这个这个类下的所有action 都带上这个Controller，localhost:3000/users/xxx |
| @JsonController(baseRoute:string) | @JsonController("/users") class SomeJsonController | 这个和@Controller的区别就是，用此装饰装饰的Controller，都会自动将控制器返回的结果转为JSON对象，并使用appllication/json content-type发送到客户端的响应 |

## Action 装饰器

| 装饰器                                           | 示例                                 | 描述                                                         | express模拟                      |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------ | -------------------------------- |
| @Get(route:string\|RegExp)                       | @Get("/users") all()                 | 此装饰器将给方法注册为GET请求                                | app.get("/users", all)           |
| @Post(route:string\|RegExp)                      | @Post("/users")  save()              | 此装饰器将给方法注册为POST请求                               | app.post("/users", save)         |
| @Put(route:string\|RegExp)                       | @Put("/users/:id")  update()         | 此装饰器将给方法注册为PUT请求                                | app.put("/users/:id", update)    |
| @Patch(route:string\|RegExp)                     | @Patch("/users/:id") patch()         | 此装饰器将给方法注册为Patch请求                              | app.patch("/users/:id", patch)   |
| @Delete(route:string\|RegExp)                    | @Delete("/users/:id")  delete()      | 此装饰器将给方法注册为DELETE请求                             | app.delete("/users/:id", delete) |
| @Head(route:string\|RegExp)                      | @Head("/users/:id") head()           | 此装饰器将给方法注册为HEAD请求                               | app.head("/users/:id", head)     |
| @All(route:string\|RegExp)                       | @All("/users/me") rewrite()          | 此装饰器将给方法注册为任何HTTP请求                           | app.all("/users/me", rewrite)    |
| @Method(methodName:string, route:string\|RegExp) | @Method("move", "/users/:id") move() | 此装饰器将给方法注册为使用自定义的 methodName HTTP方法发出的请求到给定路由 | app.move("users/:id", move)      |

## 方法参数装饰器

| 装饰器                                                | 示例                                           | 描述                         | express模拟                     |
| ----------------------------------------------------- | ---------------------------------------------- | ---------------------------- | ------------------------------- |
| @Req()                                                | getAll(@Req() request: Request)                | 注入一个Request对象          | function(request,response)      |
| @Res()                                                | getAll(@Res() response: Response)              | 注入一个Response对象         | function(request,response)      |
| @Ctx()                                                | getAll(@Ctx() context: Context)                | 注入一个Context对象（Koa中） | function(ctx)                   |
| @Param(name:string, options?: ParamOptions)           | get(@Param("id") id: number)                   | 获取params中id的值           | request.params.id               |
| @Params()                                             | get(@Params() params: any)                     | 获取params中全部的值         | request.params                  |
| @QueryParam(name:string, options?: ParamOptions)      | get(@QueryParams("id")  id: number)            | 获取query中id的值            | request.query.id                |
| @QueryParams()                                        | get(@QueryParams() params: any)                | 获取query中全部的值          | request.query                   |
| @HeaderParam(name:string, options?: ParamOptions)     | get(@HeaderParams("token") token: string)      | 获取特定的请求头             | request.headers.token           |
| @HeaderParams()                                       | get(@HeaderParams() params: any)               | 获取请求头全部的值           | request.headers                 |
| @CookieParam(name:string, options?: ParamOptions)     | get(@CookieParam("username") username: string) | 获取cookie中的username       | request.cookie("username")      |
| @CookieParams()                                       | get(@CookieParams() params: any)               | 获取cookie中全部的值         | request.cookies                 |
| @Session()                                            | get(@Session() session: any)                   | 获取session中全部的值        | request.session                 |
| @SessionParam(name: string)                           | get(@SessionParam("user") user: User)          | 获取session中的user          | request.session.user            |
| @State(name?:string)                                  | get(@State() session: StateType)               | 获取state中全部的值 (Koa中)  | ctx.state                       |
| @Body(options?: BodyOptions)                          | post(@Body() body: any)                        | 获取body中全部的值           | request.body                    |
| @BodyParam(name: string, options?: ParamOptions)      | post(@BodyParam("name") name: string)          | 获取body中name的值           | request.body.name               |
| @UploadedFile(name: string, options?: UploadOptions)  | post(@UploadedFile("filename") file: any)      | 获取file中的指定文件         | request.file.file（使用multer） |
| @UploadedFiles(name: string, options?: UploadOptions) | post(@UploadedFiles("filename") files: any[])  | 获取全部file                 | `request.files` （使用multer）  |

## 中间件和拦截器装饰器

| 装饰器                                   | 示例                                                | 描述                                 |
| ---------------------------------------- | --------------------------------------------------- | ------------------------------------ |
| @Middleware({type: "before" \| "after"}) | @Middleware({type:  "before"}) class SomeMiddleware | 注册一个全局中间件                   |
| @UseBefore()                             | @UseBefore(CompressionMiddleware)                   | 在执行操作之前使用指定的中间件       |
| @UseAfter()                              | @UseAfter(CompressionMiddleware)                    | 在执行操作之后使用指定的中间件       |
| @Interceptor()                           | @Interceptor() class SomeInterceptor                | 注册全局拦截器                       |
| @UseInterceptor()                        | @UseInterceptor(BadWordsInterceptor)                | 拦截指定的控制器或action并替换某些值 |

## 其他装饰器

| 装饰器                                                       | 示例                                            | 描述                                                         |
| ------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------ |
| @Authorized(roles?: string\|string[])                        | @Authorized("SUPER_ADMIN") get()                | 检查用户是否被授权并在指定路由上具有指定角色 `authorizationChecker` 应该在 `routing-controllers` 选项中定义 |
| @CurrentUser(options?: { required?: boolean })               | get(@CurrentUser({required: true}) user: User ) | 注入当前授权的用户 `currentUserChecker` 应该在  `routing-controllers` 选项中定义 |
| @Header(headerName: string, headerValue: string)             | @Header("Cache-Control", "private") get()       | 允许显式设置响应中返回的任何HTTP响应头                       |
| @ContentType(contentType: string)                            | @ContentType("text/csv") get()                  | 允许显式设置响应中返回的HTTP Content-Type                    |
| @Location(url: string)                                       | @Location("http://github.com")    get()         | 允许显式设置响应中返回的HTTP Location头。                    |
| @Redirect(url: string)                                       | @Redirect("http://github.com")   get()          | 允许显示设置响应中返回的HTTP Redirect头                      |
| @HttpCode(code: number)                                      | @HttpCode(201) post()                           | 允许显示设置要在响应中返回的HTTP代码                         |
| @OnNull(codeOrError: number\|Error)                          | @OnNull(201) post()                             | 当控制器操作返回未定义时设置指定的HTTP代码                   |
| @OnUndefined(codeOrError: number\|Error)                     | @OnUndefined(201) post()                        | 当控制前操作返回undefined时设置指定的HTTP代码                |
| @ResponseClassTransformOptions(options: ClassTransformOptions) | @ResponseClassTransformOptions({/*...*/})       | 设置用于classToPlain响应结果时传递给 class-transformer的选项 |
| @Render(template: string)                                    | @Render("user-list.html") get()                 | 呈现给指定的html模板，从之气返回的数据用作模板变量           |

