var express = require('express');
var twilio = require('twilio');
//var creds = require('./creds.js');

var app = express();
//var twilioClient = new twilio.RestClient(creds.sid, creds.token);

app.get('/', function(req, res) {
    res.send("Hello");
});

app.post('/message', function(req, res) {
  var twiml = new twilioClient.TwimlResponse();
  twiml.message('Thanks for the text');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  console.log("Received Request");
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log("App listening!");
});
