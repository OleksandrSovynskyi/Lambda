const axios = require("axios");

const urlList = [
  "https://jsonbase.com/lambdajson_type1/793",
  "https://jsonbase.com/lambdajson_type1/955",
  "https://jsonbase.com/lambdajson_type1/231",
  "https://jsonbase.com/lambdajson_type1/931",
  "https://jsonbase.com/lambdajson_type1/93",
  "https://jsonbase.com/lambdajson_type2/342",
  "https://jsonbase.com/lambdajson_type2/770",
  "https://jsonbase.com/lambdajson_type2/491",
  "https://jsonbase.com/lambdajson_type2/281",
  "https://jsonbase.com/lambdajson_type2/718",
  "https://jsonbase.com/lambdajson_type3/310",
  "https://jsonbase.com/lambdajson_type3/806",
  "https://jsonbase.com/lambdajson_type3/469",
  "https://jsonbase.com/lambdajson_type3/258",
  "https://jsonbase.com/lambdajson_type3/516",
  "https://jsonbase.com/lambdajson_type4/79",
  "https://jsonbase.com/lambdajson_type4/706",
  "https://jsonbase.com/lambdajson_type4/521",
  "https://jsonbase.com/lambdajson_type4/350",
  "https://jsonbase.com/lambdajson_type4/64",
];

async function getResponse(url) {
  let response = null;
  const retries = 3;
  let i = 0;
  do {
    i++;
    response = await axios.get(url);
  } while (response.status != 200 && i <= retries);
  if (response.status >= 400) {
    console.log("Error");
  } else {
    return response.data;
  }
}

async function checkResponse(resData) {
  const data = await resData;
  if (typeof data === "object" && data !== null) {
    if (data.isDone !== undefined) {
      return data.isDone;
    }

    for (let element of Object.values(data)) {
      result = await checkResponse(element);
      if (typeof result === "boolean") {
        return result;
      }
    }
  }
}

async function getInfo() {
  let countTrue = 0;
  let countFalse = 0;
  for (let i = 0; i < urlList.length; i++) {
    let response = getResponse(urlList[i]);
    let isDoneValue = await checkResponse(response);
    if (isDoneValue === undefined) {
      console.log("isDone was not found");
    } else {
      console.log(`${urlList[i]}: isDone - ${isDoneValue}`);
      if (isDoneValue === true) {
        countTrue++;
      } else {
        countFalse++;
      }
    }
  }
  console.log(`Values True: ${countTrue},`);
  console.log(`Values False: ${countFalse}`);
}

getInfo();
