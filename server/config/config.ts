export const secretOrKey = 'secret'

interface RedisConfigDto {
    ConfigCenterServiceAddress: string
    ConfigCenterPassword: string
    SystemType: string|number
    NodeConfigChanged: string
    RedisEventBus: string
}

export const RedisConfig : RedisConfigDto = {
    ConfigCenterServiceAddress: 'http://10.255.98.182:6080/api/ConigCenter/GetNode',
    ConfigCenterPassword: "abc!@#..6080",
    SystemType: 0,
    NodeConfigChanged: "NodeConfigChanged",
    RedisEventBus: 'Redis.EventBus'
}