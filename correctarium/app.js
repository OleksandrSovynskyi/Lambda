const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const priceSymbolUaRu = 0.05;
const priceSymbolEn = 0.12;
const minPriceUaRu = 50;
const minPriceEn = 120;
const mimetypes = ["none", "doc", "docx", "rtf", "other"];
const countForHourUaRu = 1333;
const countForHourEn = 333;
const minTime = 1;

router.post("/handle", (request, response) => {
  let obj = request.body;

  function calculatePriceAndTime(language, mimetype, count) {
    function checkLanguage(lang) {
      if (lang === "ua" || lang === "ru") {
        const price = priceSymbolUaRu * count;
        if (price > minPriceUaRu) {
          return price;
        } else {
          return minPriceUaRu;
        }
      } else if (lang === "en") {
        const price = priceSymbolEn * count;
        if (price > minPriceEn) {
          return price;
        } else {
          return minPriceEn;
        }
      }
    }

    function checkMimetype(type) {
      const price = checkLanguage(language);
      const newPrice = price * 1.2;
      for (let i = 0; i < mimetypes.length + 1; i++) {
        if (mimetypes[i] === type) {
          return price;
        } else if (mimetypes[i] === undefined) {
          return newPrice;
        }
      }
    }

    function calculateTime(countOfSymbols, lang, type) {
      if (lang === "ua" || lang === "ru") {
        for (let i = 0; i < mimetypes.length + 1; i++) {
          if (mimetypes[i] === type) {
            const time = 0.5 + countOfSymbols / countForHourUaRu;
            if (time > minTime) {
              return time;
            } else {
              return minTime;
            }
          } else if (mimetypes[i] === undefined) {
            const time = (0.5 + countOfSymbols / countForHourUaRu) * 1.2;
            if (time > minTime) {
              return time;
            } else {
              return minTime;
            }
          }
        }
      } else if (lang === "en") {
        for (let i = 0; i < mimetypes.length + 1; i++) {
          if (mimetypes[i] === type) {
            const time = 0.5 + countOfSymbols / countForHourEn;
            if (time > minTime) {
              return time;
            } else {
              return minTime;
            }
          } else if (mimetypes[i] === undefined) {
            const time = (0.5 + countOfSymbols / countForHourEn) * 1.2;
            if (time > minTime * 1.2) {
              return time;
            } else {
              return minTime * 1.2;
            }
          }
        }
      }
    }

    function getDeadLine(t) {
      const date = new Date();

      let weeks = parseInt(t / 2700);
      let days = parseInt(t / 540) % 5;
      let hours = parseInt(t / 60) % 9;
      let minutes = t % 60;

      const currentHour = date.getHours();
      if (currentHour < 10) {
        date.setHours(10 + hours);
        date.setMinutes(minutes);
      } else if (currentHour >= 19) {
        days++;
        date.setHours(10 + hours);
        date.setMinutes(minutes);
      } else {
        let deadlineMinutes = date.getMinutes() + minutes;
        date.setMinutes(deadlineMinutes % 60);
        if (deadlineMinutes >= 60) {
          hours++;
        }

        let deadlineHour = currentHour + hours;
        if (deadlineHour >= 19) {
          days++;
          deadlineHour = deadlineHour - 9;
        }
        date.setHours(deadlineHour);
      }

      const weekDay = date.getDay();
      if (weekDay == 0) {
        days++;
      } else if (weekDay + days >= 6) {
        days = days + 2;
      }

      date.setDate(date.getDate() + weeks * 7 + days);

      return date;
    }

    const price = checkMimetype(mimetype);
    const time = parseFloat(
      calculateTime(count, language, mimetype).toFixed(1)
    );

    const minutesToNeed = time * 60;

    const dateDone = getDeadLine(minutesToNeed);
    const deadline = parseInt(+new Date(dateDone) / 1000);
    let d = [
      "0" + dateDone.getDate(),
      "0" + (dateDone.getMonth() + 1),
      "0" + dateDone.getHours(),
      "0" + dateDone.getMinutes(),
      "0" + dateDone.getSeconds(),
    ].map((component) => component.slice(-2));

    const deadline_date =
      d.slice(0, 2).join("/") +
      "/" +
      dateDone.getFullYear() +
      " " +
      d.slice(2).join(":");
    let result = { price, time, deadline, deadline_date };
    let json = JSON.stringify(result);
    return json;
  }

  let res = calculatePriceAndTime(obj.language, obj.mimetype, obj.count);
  console.log(res);
  response.send(res);
});

app.use("/", router);

app.listen(3000, () => {
  console.log("Application listening on port 3000!");
});
