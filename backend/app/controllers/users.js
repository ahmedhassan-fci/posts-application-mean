const bcrypt = require("bcrypt");
const User = require("../models/users");
const generateToken = require("../utils/generate-token");

exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(401).json({
          message:
            "There is already an account registered with this email. You can login or Reset your password",
        });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hash,
            date: new Date(),
          });

          user
            .save()
            .then((result) => {
              res.status(201).json({
                accessToken: generateToken(result, req.body.rememberMe),
                user: result,
              });
            })
            .catch((error) => {
              return res.status(400).json({
                message: "Error in create a user",
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Invalid authentication credentials!",
      });
    });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message:
            "There is no email registered with this email. You can create new account",
        });
      } else {
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          message: "Invalid authentication credentials!",
        });
      } else {
        if (fetchedUser) {
          res.status(200).json({
            accessToken: generateToken(fetchedUser, req.body.rememberMe),
          });
        }
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Invalid authentication credentials!",
      });
    });
};

