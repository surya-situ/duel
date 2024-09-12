import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue";
import prisma from "../config/database";

export const commentQueueName = "commentQueue";

export const commentQueue = new Queue(commentQueueName, {
    connection: redisConnection,
    defaultJobOptions: {
        ...defaultQueueOptions,
        delay: 1000
    }
});

// WORKER
export const queueWorker = new Worker(commentQueueName, async (Job:Job) => 
    {
        const data = Job.data
        await prisma.duelComments.create({
            data: {
                comment: data?.comment,
                duel: data?.id
            }
        })
    },
    {
        connection: redisConnection
    }
)