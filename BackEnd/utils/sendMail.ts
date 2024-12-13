require('dotenv').config()
import ErrorHandler from './ErrorHandler';
import nodemailer from 'nodemailer'
import ejs from 'ejs';
import path from 'path';

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
    service : process.env.SMTP_SERVICE,
    auth : {
        user:process.env.SMTP_MAIL,
        pass : process.env.SMTP_PASSWORD,
    },

});

// Email sending structure
interface ISendMailOptions {
    to : string;
    subject : string;
    templateName :string;
    templateData : any;
}

export const sendEmail = async (options : ISendMailOptions) : Promise <void> => {
    
    const {to,subject,templateData,templateName} = options;

    // Render the EJS template
    const templatePath = path.resolve(__dirname, `../mails/${templateName}.ejs`);

    // Render the EJS template
    const html = await ejs.renderFile(templatePath,templateData) as string;

    const mailOptions = {
        from : process.env.SMTP_MAIL, // SENDER'S EMAIL ADDRESS
        to,
        subject,
        html,
    };

    // send email
    await transporter.sendMail(mailOptions);

}