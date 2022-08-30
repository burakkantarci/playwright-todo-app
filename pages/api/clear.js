import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async (_, res) => {
    const data = await redis.ltrim('todo', -1, 0)
    return res.status(200).json(data);
}
