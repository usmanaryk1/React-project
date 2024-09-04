const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
const nodemailer = require("nodemailer");

router.post("/forgot-password", authenticateJWT, (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not exists" });
    }
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "malaikayaseen03@gmail.com + portfolio",
        pass: "hmfq iukm jlwy wvsd",
      },
    });

    var mailOptions = {
      from: "malaikayaseen03@gmail.com + portfolio",
      to: email,
      subject: "Reset Password Link",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Portfolio. Use the following link to complete your Password Recovery Procedure.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Portfolio</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Portfolio Inc</p>
      <p>Pakistan</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
      text: ` Click the link below to reset your password
      http://localhost:3000/form/reset-form/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
      } else {
        return res.status(200).send({ message: "Success" });
      }
    });
  });
});
module.exports = router;
