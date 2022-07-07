import inquirer from "inquirer";
import fs from "fs";

function startApp() {
  const obj = {};

  const init = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "userName",
          message: "What is your name? To cancel press Enter",
        },
      ])
      .then((answer) => {
        if (answer.userName === "") {
          return wantFindUser();
        } else {
          obj.userName = answer.userName;
          continueQestions();
        }
      });
  };
  const wantFindUser = () => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "find",
          message: "Do you want to find User",
        },
      ])
      .then((answer) => {
        if (answer.find) return findUserByName();
      });
  };

  const continueQestions = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "gender",
          message: "Choose please your gender",
          choices: ["male", "female"],
        },
        {
          type: "input",
          name: "age",
          message: "How old are you?",
          validate(answer) {
            const pass = !isNaN(answer);
            if (pass) {
              return true;
            }
            return "Age must be a number";
          },
        },
      ])
      .then((answer) => {
        obj.gender = answer.gender;
        obj.age = answer.age;
        const user = JSON.stringify(obj);
        console.log(user);
        init();
        fs.writeFileSync("users.txt", `${user}\n`, { flag: "a+" });
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Your console environment is not supported!");
        } else {
          console.log(error);
        }
      });
  };

  const findUserByName = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "userName",
          message: "Please enter name to find user:",
          validate(answer) {
            if (!answer) {
              return "Name was not entered, please enter name!";
            }
            return true;
          },
        },
      ])
      .then((answer) => {
        if (answer.userName) {
          const data = fs.readFileSync("users.txt", { encoding: "utf8" });
          const arr = data.split("\n");
          const arrAfterParse = [];
          arr.shift();
          arr.pop();
          arr.forEach((el) => {
            const item = JSON.parse(`${el}`);
            arrAfterParse.push(item);
          });
          const result = arrAfterParse.filter(
            (el) => el.userName === answer.userName
          );
          if (result.length === 0) {
            console.log("User doesn't exist");
          } else {
            console.log(result);
          }
        }
      });
  };

  init();
}

startApp();
