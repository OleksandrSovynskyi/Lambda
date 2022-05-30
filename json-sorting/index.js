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

async function getInfo() {
  const arrTrue = [];
  const arrFalse = [];
  for (let i = 0; i < urlList.length; i++) {
    try {
      const response = await axios.get(urlList[i]);
      if (
        response.data.isDone === undefined &&
        response.data.location.isDone === undefined &&
        response.data.higherEducation.isDone === undefined
      ) {
        console.log("isDone was not found");
      } else {
        if (response.data.isDone === undefined) {
          if (response.data.location.isDone === undefined) {
            console.log(
              `${urlList[i]}: isDone - ${response.data.higherEducation.isDone}`
            );
            if (response.data.higherEducation.isDone === true) {
              arrTrue.push(response.data.higherEducation.isDone);
            } else {
              arrFalse.push(response.data.higherEducation.isDone);
            }
          } else {
            console.log(
              `${urlList[i]}: isDone - ${response.data.location.isDone}`
            );
            if (response.data.location.isDone === true) {
              arrTrue.push(response.data.location.isDone);
            } else {
              arrFalse.push(response.data.location.isDone);
            }
          }
        } else {
          console.log(`${urlList[i]}: isDone - ${response.data.isDone}`);
          if (response.data.isDone === true) {
            arrTrue.push(response.data.isDone);
          } else {
            arrFalse.push(response.data.isDone);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.log(`Values True: ${arrTrue.length},`);
  console.log(`Values False: ${arrFalse.length}`);
}

getInfo();
