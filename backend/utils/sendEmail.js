const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host : process.env.SMPT_HOST,
        service: process.env.SMTP_SERVICE,
        port : process.env.SMPT_PORT,
        secure: true,
        auth:{
            user : process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    const mailOption = {
        from : process.env.SMTP_MAIL,
        to: options.email,
        subject : options.subject,
        text:options.messages,
    }

    await transporter.sendMail(mailOption);
};

module.exports = sendEmail;