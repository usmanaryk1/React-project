const UserModel = require("../models/userSchema");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./api/.env" });

router.post("/", async (req, res) => {
  const { name, email, message, userId } = req.body;
  // console.log(
  //   `name:${name}, email:${email}, message:${message}, userId:${userId}`
  // );
  if (!name || !email || !message || !userId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Fetch the target user's email from the database
    const user = await UserModel.findById(userId); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Set up email configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL, // Use environment variables
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"PortfolioHub" <${email}>`,
      to: user.email, // Send to the user's email
      subject: `New message from ${name}`,
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Message</title>
      <style>
        body {
          font-family: Helvetica, Arial, sans-serif;
          line-height: 1.5;
          color: #333;
        }
        .container {
          margin: 50px auto;
          width: 70%;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 20px;
          background: #f9f9f9;
        }
        .header {
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 1.5em;
          color: #00466a;
        }
        .message-box {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          font-size: 0.9em;
          color: #aaa;
          margin-top: 20px;
        }
        .footer p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
    <div class="container">
      <div class="header">PortfolioHub</div>
      <p>You have received a new message from:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <div class="message-box">
        <p>${message}</p>
      </div>
      <p style="font-size: 0.9em;">Please reply to the sender via their email address if required.</p>
      <div class="footer">
        <p>PortfolioHub Inc</p>
        <p>Pakistan</p>
      </div>
    </div>
    </body>
    </html>
    `,
    };

    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error sending message.", error });
  }
});

module.exports = router;
