const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "config.env" });

const port = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

app.post("/send", async (req, res) => {
  try {
    const output = `<p>you have new contact request</p>
        <h3>Contact Details</h3>
        <ul>
        <li>${req.body.name}</li>
        </ul>
        `;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    let mailOptions = {
      to: process.env.USER_EMAIL,
      subject: "ProjectChecker - Website Is Down",
      text: "Hello web",
      html: output,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      res.status(200).json({
        status: "success",
        message: "sended",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("Nodemailer server up on runnnig port", port);
});
