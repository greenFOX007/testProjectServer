// // const express = require("express");
// // const cors = require("cors");
// // const puppeteer = require("puppeteer");

// // const app = express();
// // app.use(express.static("public")); // статические файлы будут в папке public
// // app.use(express.json()); // подключаем автоматический парсинг json
// // app.use(cors());

// // async function htmlToPdf() {
// //   const browser = await puppeteer.launch();
// //   const page = await browser.newPage();
// //   const html = `
// //  <style>
// //     body {
// //       font-family: Arial, sans-serif;
// //       line-height: 1.6;
// //       margin: 0;
// //       padding: 0;
// //     }
// //     h1 {
// //       text-align: center;
// //       padding: 1.5rem 0;
// //       border-bottom: 1px solid #ccc;
// //     }
// //     main {
// //       max-width: 800px;
// //       margin: 0 auto;
// //       padding: 2rem;
// //     }
// //     p {
// //       margin: 1.5rem 0;
// //     }
// //   </style>

// //   <h1>The Benefits of Reading</h1>
// //   <main>
// //     <p>Reading is an essential skill and pastime that offers numerous benefits for personal and professional growth. Some of the most significant advantages of reading include:</p>

// //     <h2>1. Mental Stimulation</h2>

// //     </main>

// //     `;

// //   await page.setContent(html);
// //   await page.pdf({ path: "output.pdf", format: "A4" });
// //   await browser.close();
// // }

// // (async () => {
// //   try {
// //     app.listen(3001);
// //     console.log("Сервер ожидает подключения...");
// //   } catch (err) {
// //     return console.log(err);
// //   }
// // })();

// // app.get("/api/pdf", async (req, res) => {
// //   res.send("lolkek");
// // });
// // // app.get("/api/users/:id", async (req, res) => {
// // //   const collection = req.app.locals.collection;
// // //   try {
// // //     const id = new objectId(req.params.id);
// // //     const user = await collection.findOne({ _id: id });
// // //     if (user) res.send(user);
// // //     else res.sendStatus(404);
// // //   } catch (err) {
// // //     console.log(err);
// // //     res.sendStatus(500);
// // //   }
// // // });

// // // app.post("/api/users", async (req, res) => {
// // //   if (!req.body) return res.sendStatus(400);
// // //   const userLogin = req.body.login;
// // //   const userPass = req.body.password;

// // //   const user = { login: userLogin, password: userPass };

// // //   const collection = req.app.locals.collection;

// // //   try {
// // //     await collection.insertOne(user);
// // //     res.header({
// // //       "Access-Control-Allow-Origin": "*",
// // //     });
// // //     res.send(user);
// // //   } catch (err) {
// // //     console.log(err);
// // //     res.sendStatus(500);
// // //   }
// // // });

// // // app.delete("/api/users/:id", async (req, res) => {
// // //   const collection = req.app.locals.collection;
// // //   try {
// // //     const id = new objectId(req.params.id);
// // //     const user = await collection.findOneAndDelete({ _id: id });
// // //     if (user) res.send(user);
// // //     else res.sendStatus(404);
// // //   } catch (err) {
// // //     console.log(err);
// // //     res.sendStatus(500);
// // //   }
// // // });

// // // app.put("/api/users", async (req, res) => {
// // //   if (!req.body) return res.sendStatus(400);
// // //   const userName = req.body.name;
// // //   const userAge = req.body.age;

// // //   const collection = req.app.locals.collection;
// // //   try {
// // //     const id = new objectId(req.body.id);
// // //     const user = await collection.findOneAndUpdate(
// // //       { _id: id },
// // //       { $set: { age: userAge, name: userName } },
// // //       { returnDocument: "after" }
// // //     );
// // //     if (user) res.send(user);
// // //     else res.sendStatus(404);
// // //   } catch (err) {
// // //     console.log(err);
// // //     res.sendStatus(500);
// // //   }
// // // });

// // // прослушиваем прерывание работы программы (ctrl-c)
// // process.on("SIGINT", async () => {
// //   console.log("Приложение завершило работу");
// //   process.exit();
// // });

// const express = require("express");
// const puppeteer = require("puppeteer");
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// app.get("/lol", async (req, res) => {
//   const tok = req;
// });

// app.post("/create-pdf", async (req, res) => {
//   const htmlContent = req.body.html;

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.setContent(htmlContent, { waitUntil: "networkidle0" });

//     const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

//     await browser.close();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Length", pdfBuffer.length);
//     res.send(pdfBuffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error generating PDF");
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
