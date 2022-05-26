const fs = require("fs");

const readDirectory = fs.readdirSync("./2kk_words");

function readFiles(dir) {
  const arr = [];
  const arrOfFiles = [];
  for (let i = 0; i < dir.length; i++) {
    arr[i] = fs.readFileSync(
      `./2kk_words/${dir[i]}`,
      "utf8",
      function (err, data) {
        if (err) console.log(err);
        else return data;
      }
    );
    const a = arr[i].split("\n");
    arrOfFiles.push(a);
  }

  function uniqueValues(arr) {
    let result = new Set(arr[0]);
    for (let i = 1; i < arr.length; i++) {
      const fileSet = new Set(arr[i]);
      result = new Set([...result, ...fileSet]);
    }
    console.log(`Unique values: ${result.size}`);
  }

  uniqueValues(arrOfFiles);

  function existInAllFiles(arr) {
    let result = new Set(arr[0]);
    for (let i = 1; i < arr.length; i++) {
      const fileSet = new Set(arr[i]);
      result = new Set([...fileSet].filter((i) => result.has(i)));
    }
    console.log(`Exist in all files: ${result.size}`);
  }

  existInAllFiles(arrOfFiles);

  function existInAtLeastTen(arr) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      const fileSet = new Set(arr[i]);
      fileSet.forEach((element) => {
        if (map.has(element)) {
          map.set(element, map.get(element) + 1);
        } else {
          map.set(element, 1);
        }
      });
    }
    let result = 0;
    for (let v of map.values()) {
      if (v >= 10) {
        result++;
      }
    }
    console.log(`Exist in at least ten files: ${result}`);
  }

  existInAtLeastTen(arrOfFiles);
}

readFiles(readDirectory);
