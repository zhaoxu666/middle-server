import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete, Req } from "routing-controllers";
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

/**
 * 获取所有用户
 * @route GET /users
 * @group user - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

  @Get("/users")
  getAll(@Req() request:any) {
    console.log(request.user)
    return this.userStore;
  }

  @Get("/users/:id")
  @OnUndefined(404)
  getOne(@Param("id") id: number) {
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