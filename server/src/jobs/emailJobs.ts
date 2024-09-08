import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue";
import { sendEmail } from "../config/mail";

export const emailQueueName = "emailQueue";

interface EmailJobsDataType {
    to: string;
    subject: string;
    body: string;
}

export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions
});

// WORKER
export const queueWorker = new Worker(emailQueueName, async (Job:Job) => 
    {
    const data = Job.data
    await sendEmail(data.to, data.subject, data.body)
    console.log('The queue data is: ', data);
    
    },
    {
        connection: redisConnection
    }
)