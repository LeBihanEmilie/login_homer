const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = express.Router();
const connection = require('./helpers/db.js');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
 
//LOCAL DEV
app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-control-Allow-Methods", 'GET, PUT, POST, DELETE, PATCH OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin, Content-type, Accept');
  if (req.method == 'OPTIONS') {
      res.status(200).end();
  } else {
    next();
  }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

passport.use(new LocalStrategy(
  (email, password, done) => {
    const userQuery = `SELECT * FROM users WHERE email='${email}'`;
    connection.query(userQuery, (err, results) => {
      console.log('sql response', results[0].email);

      const user = results[0];

      if (err) {
        console.log('err', err);
        return done(err);
      }
      if (!user.email) {
        console.log('Incorrect username.', user.email);
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        console.log('Incorrect password.', user.password);
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('Succesfuly logged in.', user);
      return done(null, user, { message: 'Succesfuly logged in.' });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

router.post('/signin', 
  passport.authenticate('local', { failureRedirect: '/signup' }),
  (req, res) => {
    res.redirect('/signup');
  }
);

router.post('/signup', (req, res, next) => {
  try {
    const insert = `INSERT INTO users ( email, password, name, lastname) values ('${req.body.email}', '${req.body.password}','${req.body.name}', '${req.body.lastname}' )`;
    connection.query(insert, function (err, response) {
      if(err)  {
        console.log(err);
        res.status(500).end();
      } 
      res.end('hey ok');
    });
  } catch(err) {
    console.log(err);
  }
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

app.use((req, res, next) => {
  let err = new Error("Not Found, l'app n'est pas trouvée");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port " + server.address().port);
});
