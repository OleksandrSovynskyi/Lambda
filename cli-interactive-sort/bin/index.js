#! /usr/bin/env node
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
startApp();

function startApp() {
  readline.question(
    "Hello, enter 10 words or digits deviding them in spaces: ",
    (args) => {
      const arr = args.split(" ");

      console.log("How would you like to sort values?");
      console.log("1.Words by name (from A to Z).");
      console.log("2.Show digits from the smallest.");
      console.log("3.Show digits from the bigest.");
      console.log("4.Words by quantity of leters.");
      console.log("5.Only unique words.");
      console.log("6.Only unique values.");
      readline.question("Select 1 - 6 and press Enter: ", (number) => {
        switch (number) {
          case "1": {
            sortByName(arr);
            startApp();
            break;
          }

          case "2": {
            digitsFromTheSmallest(arr);
            startApp();
            break;
          }

          case "3": {
            digitsFromTheBigest(arr);
            startApp();
            break;
          }

          case "4": {
            sortByQuantityLeters(arr);
            startApp();
            break;
          }

          case "5": {
            showUniqueWords(arr);
            startApp();
            break;
          }

          case "6": {
            showUniqueValues(arr);
            startApp();
            break;
          }

          case "exit": {
            console.log("Good bye! Come back again!");
            readline.close();
            break;
          }
          default:
            startApp();
        }
      });
    }
  );
}

function sortByName(argsArr) {
  const arr = [];
  for (let i = 0; i < argsArr.length; i++) {
    let checkEl = argsArr[i] * 1;
    if (isNaN(checkEl)) {
      arr.push(argsArr[i]);
    }
  }
  const mapped = arr.map(function (el, i) {
    return { index: i, value: el.toLowerCase() };
  });
  mapped.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  const result = mapped.map(function (el) {
    return arr[el.index];
  });
  console.log(result);
}

function digitsFromTheSmallest(argsArr) {
  const arr = [];
  for (let i = 0; i < argsArr.length; i++) {
    let checkEl = argsArr[i] * 1;
    if (isNaN(checkEl) === false) {
      arr.push(argsArr[i]);
    }
  }
  arr.sort(function (a, b) {
    return a - b;
  });
  console.log(arr);
}

function digitsFromTheBigest(argsArr) {
  const arr = [];
  for (let i = 0; i < argsArr.length; i++) {
    let checkEl = argsArr[i] * 1;
    if (isNaN(checkEl) === false) {
      arr.push(argsArr[i]);
    }
  }
  arr.sort(function (a, b) {
    return b - a;
  });
  console.log(arr);
}

function sortByQuantityLeters(argsArr) {
  const arr = [];
  for (let i = 0; i < argsArr.length; i++) {
    let checkEl = argsArr[i] * 1;
    if (isNaN(checkEl)) {
      arr.push(argsArr[i]);
    }
  }
  arr.sort(function (a, b) {
    return a.length - b.length;
  });
  console.log(arr);
}

function showUniqueWords(argsArr) {
  const arr = [];
  for (let i = 0; i < argsArr.length; i++) {
    let checkEl = argsArr[i] * 1;
    if (isNaN(checkEl)) {
      arr.push(argsArr[i]);
    }
  }
  uniqueArray = [...new Set(arr)];

  console.log(uniqueArray);
}

function showUniqueValues(argsArr) {
  uniqueArray = [...new Set(argsArr)];

  console.log(uniqueArray);
}
