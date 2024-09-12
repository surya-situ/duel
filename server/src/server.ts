import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import ejs from "ejs";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import { createServer, Server as HttpServer } from "http";

import router from "./routes/index.js";
import { emailQueue, emailQueueName } from "./jobs/emailJobs";
import "./jobs/index"
import { appLimiter } from "./config/rateLimit.js";
import { setupSocket } from "./socket.js";

dotenv.config();
const PORT = process.env.PORT || 7000;

const app:Application = express();

// Socket.io
const server:HttpServer = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL
    }
});

export {io};
setupSocket(io);

// - Global middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter); // Rate limiter
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));
app.use(express.static("public"))

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

server.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
});