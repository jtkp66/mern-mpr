const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
// router.post("/register", (req, res) => {
//   User.findOne({ email: req.body.email }, (err, foundUser) => {
//     if (err) return res.status(400).json({ Error: err });

//     if (foundUser)
//       return res.status(400).json({ Email: "Email already exists" });

//     const { firstname, lastname, email, password } = req.body;

//     bcrypt.hash(password, 10, (err, hash) => {
//       User.create(
//         { firstname, lastname, email, password: hash },
//         (err, newUser) => {
//           if (err) console.log(err);
//           else res.json(newUser);
//         }
//       );
//     });
//   });
// });

module.exports = router;
