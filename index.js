var EmailService = require('nodemailer');
var ExpressService = require('express');
var accountSid = 'ACcc15afd';
var authToken = 'sdfsdf';

var client = require('twilio')(accountSid, authToken);
var app = ExpressService();

var emailTransport = EmailService.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "adsfsdaf",
    pass: "asdfsdf"
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
        to: "+9145545454 ",
        from: "545555",
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
