const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mongo = require("./mongo");
const { secret, secretRefresh } = require("./config");

const generateAccessToken = (id, userName) => {
  const payload = {
    id,
    userName,
  };

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomExpiresIn = getRandomIntInclusive(30, 60);
  return jwt.sign(payload, secret, { expiresIn: randomExpiresIn + "s" });
};

const verifyAccessToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, secret, (err, payload) => {
      if (err) {
        return reject(err);
      }
      const userName = payload.userName;
      resolve(userName);
    });
  });
};

const generateRefreshToken = (id, userName) => {
  const payload = {
    id,
    userName,
  };

  return jwt.sign(payload, secretRefresh, { expiresIn: "1y" });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, secretRefresh, (err, payload) => {
      if (err) {
        return reject(err);
      }
      const userId = payload.id;
      resolve(userId);
    });
  });
};

class authController {
  async registration(req, res) {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      const errorsMsg = errors.array().forEach((el) => {
        res.send(el.msg);
      });
      if (!errors.isEmpty()) {
        return res.json({ message: "Registration error", errorsMsg });
      }
      const { userName, password } = req.body;
      const candidate = await mongo.Users.checkUserName({ userName });
      if (candidate) {
        return res.json({ message: "User with this name is exist" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = { userName, password: hashPassword };
      console.log(user);
      await mongo.Users.addUser(user);
      return res.json({ message: "User was created successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await mongo.Users.checkUserName({ userName });
      if (!user) {
        return res
          .status(400)
          .json({ masssege: `User ${userName} was not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ masssege: `Password is not correct` });
      }
      const token = generateAccessToken(user._id, user.userName);
      const refreshToken = generateRefreshToken(user._id, user.userName);
      return res.json({ accessToken: token, refreshToken: refreshToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }

  async useRefreshToken(req, res) {
    try {
      const refreshToken = req.headers.authorization.split(" ")[1];
      if (!refreshToken) {
        return res.status(400).json({ masssege: "No token provided!" });
      }
      const userId = await verifyRefreshToken(refreshToken);
      const token = generateAccessToken(userId);
      const refreshedToken = generateRefreshToken(userId);
      return res.json({ accessToken: token, refreshToken: refreshedToken });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Unauthorized" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid token" });
      }
    }
  }

  async getTokenInfo(req, res) {
    try {
      const url = req.url;
      const requestNum = parseInt(url.split("").pop());
      const accessToken = req.headers.authorization.split(" ")[1];
      console.log(accessToken);
      if (!accessToken) {
        return res.status(400).json({ masssege: "No token provided!" });
      }
      const userName = await verifyAccessToken(accessToken);
      const result = { request_num: requestNum, data: { userName: userName } };
      const json = JSON.stringify(result);
      console.log(json);
      return res.status(200).send(json);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).send({ message: "Unauthorized" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).send({ message: "Invalid token" });
      }
    }
  }
}

module.exports = new authController();
