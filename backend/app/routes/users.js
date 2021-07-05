const express = require("express");

const userController = require("../controllers/users");
const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/signin", userController.userLogin);

module.exports = router;
