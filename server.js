const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/send-message", async (req, res) => {
  const { name, email, subject, message, timeSpent } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shagungoyal0401@gmail.com", 
      pass: "ahvv kmre ioga pvtw" 
    },
  });

  const mailOptions = {
    from: email,
    to: "shagungoyal0401@gmail.com",
    subject: `New Contact Form Submission: ${subject}`,
    text: `
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Time Spent on Site: ${timeSpent} seconds
    Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:3000`));
