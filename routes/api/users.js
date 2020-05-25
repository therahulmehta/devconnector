const express = require("express");
const router = express.Router();
// https://express-validator.github.io/docs/
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 is bad request
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User route");
  }
);
module.exports = router;
