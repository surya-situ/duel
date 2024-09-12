import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue";
import prisma from "../config/database";

export const votingQueueName = "votingQueue";

export const votingQueue = new Queue(votingQueueName, {
    connection: redisConnection,
    defaultJobOptions: {
        ...defaultQueueOptions,
        delay: 500
    }
});

// WORKER
export const queueWorker = new Worker(votingQueueName, async (Job:Job) => 
    {
        const data = Job.data
        await prisma.duelItem.update({
            where: {
                id: data?.duelItemId
            },
            data: {
                count: {
                    increment: 1
                }
            }
        })
    },
    {
        connection: redisConnection
    }
)