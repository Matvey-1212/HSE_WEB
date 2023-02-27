// load the things we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));


app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


// set the view engine to ejs
app.set('view engine','ejs');


app.post("/send", function(req, res) {
    
    console.log(req.body);
    
    //res.redirect("/");

    res.status(200).end();
});

// index page 
app.get('/', function(req, res) {
    

    res.render('pages/index');
});

// about page
app.get('/contacts', function(req, res) {
    res.render('pages/contacts');
});

app.listen(8080);
console.log('8080 is the magic port');
