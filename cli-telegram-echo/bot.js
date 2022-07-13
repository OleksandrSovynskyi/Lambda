const TelegramBot = require('node-telegram-bot-api');
const express = require("express");
const axios = require("axios");

const app = express();

const token = '5531776943:AAFOAfuYgWG9RmlKgdPwlMVRpne3v1h5MI8';

const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if(msg.text === 'photo') {
    axios.get('https://picsum.photos/200/300')
    .then(response => {
        const img = response.request.res.responseUrl;
        bot.sendPhoto(chatId, img);
        console.log(`User ${msg.from.first_name} wants to get a picture`)
    })
    .catch(error => console.log(error))
        
    } else {
        console.log(`User ${msg.from.first_name} sent message: ${msg.text}`);
    	bot.sendMessage(chatId, `User ${msg.from.first_name} sent message: ${msg.text}`);
    }
});

app.listen(3000, () => {
    console.log("Bot has been started");
  });