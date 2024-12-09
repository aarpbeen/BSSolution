"use strict";
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
const sendEmail = async (options) => {
    const { to, subject, templateData, templateName } = options;
    // Render the EJS template
    const templatePath = path_1.default.join(__dirname, `../mails/${templateName}.ejs`);
    // Render the EJS template
    const html = await ejs_1.default.renderFile(templatePath, templateData);
    const mailOptions = {
        from: process.env.SMTP_MAIL, // SENDER'S EMAIL ADDRESS
        to,
        subject,
        html,
    };
    // send email
    await transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
