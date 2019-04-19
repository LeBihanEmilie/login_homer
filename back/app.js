const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = express.Router();
const connection = require('./helpers/db.js');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const bcrypt  = require ('bcryptjs') ; 
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;


const SECRET = 'emilie';
 
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
  {  
    usernameField: 'email', 
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    const userQuery = `SELECT * FROM users WHERE email='${email}'`;
    connection.query(userQuery, (err, results) => {
      console.log('sql response', results[0].email);

      const user = results[0];

      // si y'a une erreur
      if (err) {
        console.log('err', err);
        return done(err);
      }

      // si le mail n'est pas bon
      if (!user.email) {
        console.log('Incorrect username.', user.email);
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          // si le password est bon
          console.log('Succesfuly logged in.', user);
          return done(null, user, { message: 'Succesfuly logged in.' });
        } else {
          // si le password n'est bon
          console.log('Incorrect password.', user.password);
          return done(null, false, { message: 'Incorrect password.' });
        } 
      });
    });
  }
));

passport.use(new JwtStrategy({  
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),  
  secretOrKey   : SECRET  
},
  (jwtPayload, cb) => {  
    return cb(null, jwtPayload);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

router.post('/signin', 
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const token = jwt.sign(req.body.email, SECRET);  
    return res.json({
      user: req.body.email,
      token
    });  
  }
);


router.post('/signup', (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, function(hashErr, hash) {
      if (hashErr) {
        console.log(hashErr);
        res.status(500).end();
      }

      const insert = `INSERT INTO users ( email, password, name, lastname) values ('${req.body.email}', '${hash}','${req.body.name}', '${req.body.lastname}' )`;
      connection.query(insert, function (sqlErr, response) {
        if(sqlErr)  {
          console.log(sqlErr);
          res.status(500).end();
        }
        res.end('hey ok');
      });
    });
  } catch(err) {
    console.log(err);
  }}
)

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

router.get("/profile", passport.authenticate('jwt', { session:  false }), (req, res) => {
  res.send('hallo, ich bin Emilie');
});
 

app.use((req, res, next) => {
  let err = new Error("Not Found, l'app n'est pas trouvée");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port " + server.address().port);
});
