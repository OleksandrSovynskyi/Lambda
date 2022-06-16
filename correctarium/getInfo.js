const axios = require("axios");

axios
  .post("http://localhost:3000/handle", {
    language: "en",
    mimetype: "none",
    count: 10_000,
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
