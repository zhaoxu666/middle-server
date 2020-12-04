import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import UserInfo from '../../models/login'
import jwt  from 'jsonwebtoken'
import { secretOrKey } from '../../config/config'
@JsonController("/login")
export class LoginController {
    @Post("/login")
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