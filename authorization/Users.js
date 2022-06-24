class User {
  constructor(db) {
    this.collection = db.collection("users");
  }
  async addUser(user) {
    const newUser = await this.collection.insertOne(user);
    return newUser;
  }
  async checkUserName(userName) {
    const existingUser = await this.collection.findOne(userName);
    return existingUser;
  }
}
module.exports = User;
