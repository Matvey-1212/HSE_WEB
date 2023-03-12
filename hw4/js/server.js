// load the things we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const {connectTodb, getDb} = require('./db');
//const db = require('./db');

let db;


app.use(express.static('public'));


app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// set the view engine to ejs
app.set('view engine','ejs');







// index page 
app.get('/', function(req, res) {
    

    res.render('pages/index');
});

// about page
app.get('/contacts', function(req, res) {
    res.render('pages/contacts');
});

app.post("/send", function(req, res) {
    
    //console.log(req.body);
    
    

    db
       .collection('users')
       .insertOne(req.body)
       .then((result) => {
          res
             .status(200)
             //.json(req.body)
             .end();
       })
       .catch(()=> handleError(res,"error1"));

       text = req.body;
    res.redirect("/data");

    
});

app.get('/data', function(req, res) {

    const data = [];
 

    db
    .collection('users')
    .findOne({}, {sort:{$natural:-1}})
    .then((result) => {
    //    res
    //       .status(200)
    //       .json(result)
    //       .end();
    
        console.log(result);
        res.render('pages/data', {
            tagline1: result.name,
            tagline2: result.number
    });
    })
    .catch(()=> handleError(res,"error1"));

    
    
    
});

connectTodb((err) => {
    if(!err){
        app.listen(8080);
        console.log('8080 is the magic port');
        db = getDb();

    }
    else{
        console.log('DB connection error');
    }
})




