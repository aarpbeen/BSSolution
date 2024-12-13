"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
require('dotenv').config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
// Nodemailer transport setup
const transporter = nodemailer_1.default.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, templateData, templateName } = options;
    // Render the EJS template
    const templatePath = path_1.default.resolve(__dirname, `../mails/${templateName}.ejs`);
    // Render the EJS template
    const html = yield ejs_1.default.renderFile(templatePath, templateData);
    const mailOptions = {
        from: process.env.SMTP_MAIL, // SENDER'S EMAIL ADDRESS
        to,
        subject,
        html,
    };
    // send email
    yield transporter.sendMail(mailOptions);
});
exports.sendEmail = sendEmail;
