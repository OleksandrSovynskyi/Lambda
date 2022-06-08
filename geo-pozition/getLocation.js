const axios = require("axios");


async function getResponse(url) {
    const response = await axios.get(url);
    if (response.status >= 400) {
      console.log("Error");
    } else {
      console.log(response.data);
      return response.data;
    }
}

getResponse('https://0040-185-42-129-50.eu.ngrok.io/getLocation');


