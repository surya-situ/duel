"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const index_js_1 = __importDefault(require("./routes/index.js"));
const emailJobs_1 = require("./jobs/emailJobs");
require("./jobs/index");
const rateLimit_js_1 = require("./config/rateLimit.js");
const socket_js_1 = require("./socket.js");
dotenv_1.default.config();
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
// Socket.io
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL
    }
});
exports.io = io;
(0, socket_js_1.setupSocket)(io);
// - Global middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(rateLimit_js_1.appLimiter); // Rate limiter
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));
app.use(express_1.default.static("public"));
// - View Engine
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve(__dirname, "./views"));
// - Routes
app.use(index_js_1.default);
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hello from server"
    });
});
app.get('/email', async (req, res) => {
    const html = await ejs_1.default.renderFile(__dirname + `/views/emails/welcome.ejs`, { name: "surya" });
    await emailJobs_1.emailQueue.add(emailJobs_1.emailQueueName, { to: "iamkantasurya@gmail.com", subject: "Testing queue email", body: html });
    return res.status(200).json({
        message: 'email send successfully'
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});
