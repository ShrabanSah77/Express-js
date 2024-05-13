const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smpt.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_user,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ email, subject, htmlMsg }) => {
  const { messageId } = await transporter.sendMail({
    from: '"shraban sah" <shrabanshah77.email>', // sender address
    to: ", 1shrabanshah55@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlMsg, // html body
  });
  return messageId;
};

module.exports = { sendMail };
