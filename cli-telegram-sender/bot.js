const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const token = "5472630404:AAFbovxyaisppMk3WXYTM5zUJ-G4ZX3-OsI";
const chatId = 660624240;

const bot = new TelegramBot(token, { polling: true });

app.post("/message", function (req, res) {
  const msg = req.body.msg;
  bot.sendMessage(chatId, msg);
  res.status(200).send("Massage has been sent");
});

app.post("/image", function (req, res) {
  const img = fs.readFileSync(req.body.img);
  bot.sendPhoto(chatId, img);
  res.status(200).send("Image has been sent");
});

app.listen(3000, () => {
  console.log("Application listening on port 3000!");
});
