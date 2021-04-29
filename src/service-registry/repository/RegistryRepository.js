const { promisify } = require('util');
const redis = require('redis');
const { REDIS_HOST, REDIS_PORT } = require('../config/redis');
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})

const saveByServiceName = async (registry) => {
    return await redisClient.set(registry.name, JSON.stringify(registry));
}

const findByServiceName = async name => {
    let getAsync = promisify(redisClient.get).bind(redisClient);
    const registry = await getAsync(name);
    return registry ? JSON.parse(registry) : {};
}

exports.findByServiceName = findByServiceName;
exports.saveByServiceName = saveByServiceName;


