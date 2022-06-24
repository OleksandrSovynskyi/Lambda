const express = require("express");
const app = express();
const authRouter = require("./authRouter");
const mongo = require("./mongo");

app.use(express.json());
app.use("/auth", authRouter);

async function start() {
  await mongo.init();
}
start();

app.listen(3000, () => {
  console.log("Application listening on port 3000!");
});
