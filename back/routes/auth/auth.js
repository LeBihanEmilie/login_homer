const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const connection = require('../../helpers/db.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/signup', function(req, res, next) {
  try {
    const insert = `INSERT INTO users ( email, password, name, lastname) values ('${req.body.email}', '${req.body.password}','${req.body.name}', '${req.body.lastname}' )`;
    connection.query(insert, function (err, result) {
      if(err)  {
        res.status(500).end();
      } 
      res.end('hey ok');
    });
  } catch(err) {
    console.log(err);
  }
});


  module.exports = router;