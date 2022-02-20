const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {

        console.log(email,subject,text);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            transportMethod: 'SMTP',
            auth: {
                user: "giorgosts07@gmail.com",
                pass: "xcfytzrchwvzgwjz",
            },
           
        });
 

        await transporter.sendMail({
            from: "giorgosts07@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;