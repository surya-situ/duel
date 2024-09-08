import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";

import router from "./routes/index.js";
import { emailQueue, emailQueueName } from "./jobs/emailJobs";
import "./jobs/index"
import { appLimiter } from "./config/rateLimit.js";

dotenv.config();

const app:Application = express();
const PORT = process.env.PORT || 7000;

// - Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter); // Rate limiter

// - View Engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./views"));

// - Routes
app.use(router);

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Hello from server"
    })
})

app.get('/email', async (req: Request, res: Response) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {name: "surya"});

    await emailQueue.add(emailQueueName, { to: "iamkantasurya@gmail.com", subject: "Testing queue email", body: html })
    return res.status(200).json({
        message: 'email send successfully'
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
});