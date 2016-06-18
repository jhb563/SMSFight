var express = require('express');
var twilio = require('twilio');
var creds = require('./creds.js');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var twilioClient = new twilio.RestClient(process.env.twilio_sid || creds.sid, process.env.twilio_token || creds.token);

app.get('/', function(req, res) {
    res.send("Hello");
});

app.post('/message', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  if (req.body.Body == 'start') {
    twiml.message("Game started!");
  } else {
    twiml.message("I don't recognize that!");
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log("App listening!");
});
