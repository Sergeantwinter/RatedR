var express = require('express');
var router = express.Router();
var fs = require('fs')
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');


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
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
        user: "aryan.mahamune02@gmail.com",
        pass: "puhkzpezzjzvlvcx"
      }
    }));
    var mailOptions = {
      from: 'aryan.mahamune02@gmail.com',
      to: req.body.email,
      subject: 'Successfullt Tickets Booked',
      text: 'Your tickets for the concert have been successfully Booked.'
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if(error){
        console.log(error);
      } else{
        res.render('success');
      }
    });

    // async function main() {
    //   // Generate test SMTP service account from ethereal.email
    //   // Only needed if you don't have a real mail account for testing
    //   let testAccount = await nodemailer.createTestAccount();
    
    //   // create reusable transporter object using the default SMTP transport
    //   let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: "alek.kunde@ethereal.email", // generated ethereal user
    //       pass: "ngXRhGEe7dRpAjAZTt", // generated ethereal password
    //     },
    //   });
    
    //   // send mail with defined transport object
    //   let info = await transporter.sendMail({
    //     from: '"RatedR" <alek.kunde@ethereal.email>', // sender address
    //     to: req.body.email, // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<p>TICKETS BOOKED</p>", // html body
    //   });
    
    //   console.log("Message sent: %s", info.messageId);
    //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    //   // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // }
    
    // main().catch(console.error);

   });
    
});



module.exports = router;
