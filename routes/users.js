const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

// SIGN UP
router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.userSignUp));

// LOGIN

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.userLogin
);

// LOGOUT
router.get("/logout", userController.userLogout);

module.exports = router;
