import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@JsonController()
export class ListController {
    @Get('/list')
    getAll () {
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
}