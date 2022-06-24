const { MongoClient } = require("mongodb");
const Users = require("./Users");

class MongoBot {
  constructor() {
    const url =
      "mongodb+srv://AlexSov:qwerty32167@cluster0.dlm37sw.mongodb.net/?retryWrites=true&w=majority";

    this.client = new MongoClient(url);
  }
  async init() {
    await this.client.connect();
    console.log("connected");

    this.db = this.client.db("auth");
    this.Users = new Users(this.db);
  }
}

module.exports = new MongoBot();
