const express = require("express");
const app = express();
const requestIp = require("request-ip");
const fs = require("fs");

app.get("/getLocation", function (req, res) {
  const clientIp = requestIp.getClientIp(req);

  function ipAddressToLong(ip) {
    return ip
      .split(".")
      .map((octet, index, array) => {
        return parseInt(octet) * Math.pow(256, array.length - index - 1);
      })
      .reduce((prev, curr) => {
        return prev + curr;
      });
  }

  function getLocation(ip) {
    const data = fs.readFileSync("./IP2LOCATION-LITE-DB1.CSV", {
      encoding: "utf8",
      flag: "r",
    });
    const normalizeData = data.replaceAll('"', "");
    const arr = normalizeData.split("\r\n");
    const arrOfData = [];
    for (let i = 0; i < arr.length; i++) {
      arrOfData[i] = arr[i].split(",");
    }

    for (let i = 0; i < arrOfData.length; i++) {
      let startRange = parseInt(arrOfData[i][0]);
      let endRange = parseInt(arrOfData[i][1]);
      if (ip >= startRange && ip <= endRange) {
        const obj = {
          start: startRange,
          end: endRange,
          location: arrOfData[i][3],
        };
        return obj;
      }
    }
  }

  let result = getLocation(ipAddressToLong(clientIp));

  res.send(result);
});

app.listen(3000, () => {
  console.log("Application listening on port 3000!");
});
