export const secretOrKey = 'secret'

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