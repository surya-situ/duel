import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app:Application = express();
const PORT = process.env.PORT || 7000;

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        status: "Ok",
        message: "Hello from server"
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
});