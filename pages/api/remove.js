import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async (req, res) => {
    if (!req.query.todo) {
        return res.status(400).send("todo parameter required.")
    }
    const todo = encodeURI(req.query.todo)

    const data = await redis.lrem('todo_oz', 1, todo)
    return res.status(200).json(data);
}
