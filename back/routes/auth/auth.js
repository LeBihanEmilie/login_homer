const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/signup', function(req, res, next) {
    res.send('I am in POST signup');
  });

  app.post("/signup", (req, res) => {
    res.send("badass signup");
  });

  module.exports = router;
