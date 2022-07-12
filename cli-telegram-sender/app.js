const { program } = require('commander');
const axios = require("axios");



program
  .command('say <msg>')
  .description('Say something interesting (command for sending a message to Telegram user, accept string)')
  .action(function(msg){
    axios.post("http://localhost:3000/message", {msg})
    .then(function (response) {
        console.log(response.data);        
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  program
  .command('sendImage <img>')
  .description('Send image (command for sending an image to Telegram user, accept path to image)')
  .action(function(img){
    axios.post("http://localhost:3000/image", {img})
    .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
        console.log("Invalid path to image!");
      });
  })

program.parse(process.argv);

