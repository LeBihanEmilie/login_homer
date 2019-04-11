const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth/auth");
const connection = require('./helpers/db.js');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use('/signup', authRouter); 



app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 6999, function() {
  console.log("Listening on port " + server.address().port);
});
