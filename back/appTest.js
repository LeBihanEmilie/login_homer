const express = require('express');
const app = express();

// get an instance of router
var router = express.Router();

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('im the home page!');  
});

// about page route (http://localhost:8080/about)
router.post('/about', function(req, res) {
    res.send('im the about page!'); 
});

// apply the routes to our application
app.use('/', router);

app.listen(8080);