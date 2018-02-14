var EmailService = require('nodemailer');
var ExpressService = require('express');
var accountSid = 'ACcc1515053bc1e4a332ec646aea76c152';
var authToken = '7cd84a9868c2e069e0690d4376bc07ea';

var client = require('twilio')(accountSid, authToken);
var app = ExpressService();

var emailTransport = EmailService.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "jiteshpowankar@gmail.com",
    pass: "jitya@23"
  }
});

app.get('/', function (req, res) {
  res.sendfile('main.html');
});

app.get('/send', function (req, res) {
  var mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
  }
  
  emailTransport.sendMail(mailOptions, function (error, response) {
    console.log("response", response);
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      client.messages.create({
        to: "+919649219525 ",
        from: "(424) 353-2273",
        body: "This is the first demo E-mail.",
      }, function (err, message) {
        console.log(message.sid);
      });
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});


app.listen(3000, function () {
  console.log("Express Started on Port 3000");
});
