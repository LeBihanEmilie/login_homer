const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', function(req, res, next) {
  const insert = `INSERT INTO users ( email, password, name, lastname) values ('${req.body.email}', '${req.body.password}','${req.body.name}', '${req.body.lastname}' )`
    connection.query(insert, function (err, result) {
      if(error)
      res.status(500).end();
    res.end('badass!!!!!!');
    })
  });


  module.exports = router;

