const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./api/.env" });
// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL, // Use environment variables
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (link, email) => {
  const mailOptions = {
    from: `"Portfolio Support" <${process.env.SENDER_EMAIL}>`, // Replace with your sender email
    to: email,
    subject: "Verify Your Email Address",
    text: `Click this link to verify your email: ${link}`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Recovery</title>
      <style>
        a {
          background-color: #00466a;
          text-color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          cursor: pointer;
        }
        a:hover {
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
    <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
        <div style="border-bottom: 1px solid #eee;">
          Portfolio
        </div>
        <p style="font-size: 1.1em;">Hi,</p>
        <p>Thank you for choosing Portfolio. Click the button below to verify your email address:</p>
        <h2 style="margin: 0 auto; width: max-content; padding: 0 10px;">
          <a href="${link}" style="color: white;">
            Verify It's You!
          </a>
        </h2>
        <p style="font-size: 0.9em;">Regards,<br />Portfolio</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
          <p>Portfolio Inc</p>
          <p>Pakistan</p>
        </div>
      </div>
    </div>
    </body>
    </html>
    `,
  };

  // Use nodemailer or another email service to send the email
  // Example using nodemailer:
  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
