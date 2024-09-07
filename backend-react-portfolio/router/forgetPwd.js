// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");
// const UserModel = require("../models/userSchema");
// const jwt = require("jsonwebtoken");

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   // Validate the email
//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     // Check if user exists
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     // Create a token that expires in 7 days
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Configure nodemailer
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "malaikayaseen03@gmail.com",
//         pass: "hmfq iukm jlwy wvsd", // Ideally, use environment variables for sensitive data
//       },
//     });

//     // Define the mail options
//     const mailOptions = {
//       from: "malaikayaseen03@gmail.com",
//       to: email,
//       subject: "Password Recovery Link",
//        html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Password Recovery</title>
//         <style>
//           a {
//             background-color: #00466a;
//             color: #ffffff;
//             padding: 10px 20px;
//             text-decoration: none;
//             border-radius: 5px;
//             cursor: pointer;
//           }
//           a:hover {
//             opacity: 0.8;
//           }
//         </style>
//       </head>
//       <body>
//       <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
//         <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
//           <div style="border-bottom: 1px solid #eee;">
//             Portfolio
//           </div>
//           <p style="font-size: 1.1em;">Hi,</p>
//           <p>Thank you for choosing Portfolio. Click the button below to reset your password:</p>
//           <h2 style="margin: 0 auto; width: max-content; padding: 0 10px;">
//             <a href="http://localhost:3000/form/reset-form/${user._id}/${token}">

{
  /* <a href="https://frontend-react-portfolio.vercel.app/form/reset-form/${user._id}/${token}"> */
}

//               Reset your password
//             </a>
//           </h2>
//           <p style="font-size: 0.9em;">Regards,<br />Portfolio</p>
//           <hr style="border: none; border-top: 1px solid #eee;" />
//           <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
//             <p>Portfolio Inc</p>
//             <p>Pakistan</p>
//           </div>
//         </div>
//       </div>
//       </body>
//       </html>
//       `,
// //     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: "Success" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./api/.env" });

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Validate the email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Create a token that expires in 7 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL, // Use environment variables
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the mail options
    const mailOptions = {
      from: `"Portfolio Support" <${process.env.SENDER_EMAIL}>`, // Use a recognizable sender name
      to: email,
      subject: "Password Recovery Link",
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
          <p>Thank you for choosing Portfolio. Click the button below to reset your password:</p>
          <h2 style="margin: 0 auto; width: max-content; padding: 0 10px;">
            <a href="https://frontend-react-portfolio.vercel.app/form/reset-form/${user._id}/${token}" style="color: white;">
              Reset your password
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
      text: `http://localhost:3000/form/reset_form/${user._id}/${token}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
