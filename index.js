const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware для парсинга данных формы
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
  res.send(`
    <form action="/send-email" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <button type="submit">Send email</button>
    </form>
  `);
});

// Маршрут для отправки электронной почты
app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  // Валидация адреса электронной почты
  // if (!validateEmail(email)) {
  //   return res.status(400).send("Invalid email");
  // }

  // Настройка транспортера Nodemailer
  let testEmailAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testEmailAccount.user,
      pass: testEmailAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Настройка сообщения электронной почты
  const mailOptions = {
    from: "test@gmail.com",
    to: "vova280297@mail.ru",
    subject: "Test email",
    text: email,
  };

  // Отправка электронной почты
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send("Email sent");
    }
  });
});

// Функция для валидации адреса электронной почты
// function validateEmail(email) {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(((?!-)[a-zA-Z\-0-9]+(?<!-)\.)+[a-zA-Z]{2,}))$/.test(
//       email
//     );
//   return re;
// }

const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
