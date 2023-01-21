import IORedis from 'ioredis';

if (!process.env.REDIS_PORT || !process.env.REDIS_HOST || !process.env.REDIS_PASSWORD) {
    throw new Error('Missing environment variables');
}
const redis = new IORedis(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST, {
    password: process.env.REDIS_PASSWORD,
});

export default redis;