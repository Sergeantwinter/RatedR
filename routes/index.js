var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});

router.post('/submit', function(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let number = req.body.number;
   fs.appendFile('data.txt',`name: ${name}, email: ${email}, number: ${number}\n`, function(e) {
    if(e){
      console.log(e);
    }
    res.send("Form Submitted.");
   });
});

module.exports = router;
