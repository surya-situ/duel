import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";
import { sendEmail } from "./config/mail";
import { emailQueue, emailQueueName } from "./jobs/emailJobs";
import "./jobs/index"

dotenv.config();

const app:Application = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View Engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./views"));

app.get('/', async (req: Request, res: Response) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {name: "surya"});
    // await sendEmail('iamkantasurya@gmail.com', 'Testing', html)

    await emailQueue.add(emailQueueName, { to: "iamkantasurya@gmail.com", subject: "Testing queue email", body: html })
    return res.status(200).json({
        message: 'email send successfully'
    });
});

// Queues
// import "./jobs/index.ts"

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
});