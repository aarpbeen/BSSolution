"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = __importDefault(require("./middleware/error"));
const morgan = require('morgan');
const user_routes_1 = __importDefault(require("./routes/user.routes"));
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use(morgan('dev'));
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// corss origin resource sharing
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    credentials: true, // Allow cookies and credentials
}));
// Import router
exports.app.use('/api/v1', user_routes_1.default);
// testing API
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Api is working"
    });
});
// unknown routes
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Error-handling middleware
exports.app.use(error_1.default);
