"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
app.get('/', (req, res) => {
    return res.status(200).json({
        status: "Ok",
        message: "Hello from server"
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});
