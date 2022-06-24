const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("./authController");

router.post(
  "/registration",
  [
    check("userName", "User name can't be empty").notEmpty(),
    check("password", "Password must be from 4 to 10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  authController.registration
);

router.post("/login", authController.login);

router.post("/refresh", authController.useRefreshToken);

router.get("/me[0-9]", authController.getTokenInfo);

module.exports = router;
