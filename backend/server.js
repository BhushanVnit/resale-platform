const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const nodemailer = require("nodemailer");
const connectDb = require('./config/db');


// ==== Connecting to Database ====
connectDb();

app.post("/buyOrder", (req, res) => {
  let name = req.query.name;
  let senderEmail = req.query.email;
  let recipientEmail = req.query.resEmail;
  let message = req.query.message;
  let mobile = req.query.mobile;

  let text = message + "                                                          Request by : " + name + " (" + mobile + " )";

  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: 'olxvnit@gmail.com',
      pass: 'jgoybbniwtxiojqz'
    }
  });

  let mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: 'Regarding Product you are selling on OLX-VNIT',
    text: text
  };

  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('listening on port ' + port);
})