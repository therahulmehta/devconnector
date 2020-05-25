const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator"); // https://express-validator.github.io/docs/
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route  GET api/users
// @desc   Test route
// @access  public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include valid email").isEmail(),
    check("password", "please enter a password with 6+ characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 is bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      // see if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10); //hashing variable

      user.password = await bcrypt.hash(password, salt);

      await user.save(); // await on anything that return promise

      //return jsonwebtoken; auto login after registering
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
