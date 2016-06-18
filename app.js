var express = require('express');
var twilio = require('twilio');
var creds = require('./creds.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Character = require('./Character.js');
var Game = require('./Game.js');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var twilioClient = new twilio.RestClient(process.env.twilio_sid || creds.sid, process.env.twilio_token || creds.token);

app.get('/', function(req, res) {
    res.send("Hello");
});

var STARTING_HEALTH = 20;

app.post('/message', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  var fromNumber = req.body.From;
  var message = req.body.Body;
  Game.Game.findOne({phoneNumber: fromNumber, finished: false}).exec(function(err, game) {
    if(err) throw err;
    if (!game && message == 'start') {
      var c1 = new Character.Character({
        health: STARTING_HEALTH
      });
      var c2 = new Character.Character({
        health: STARTING_HEALTH
      });
      var newGame = new Game.Game({
        player1 : c1,
        player2 : c2,
        phoneNumber : fromNumber,
        finished: false
      });
      newGame.save().then(function(doc) {
        // Start the game by either asking the player for their first move
        // or making a move for the computer and THEN asking the player for
        // their move. 
        twiml.message('You have started a new game!');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      });
    } else if (game) {
      // interpret then move! 
      console.log(game.player1.health);
      console.log(game.player2.health);
      console.log(game.phoneNumber);
      twiml.message('You have started a new game');
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    } else {
      twiml.message('I do not understand your message!');
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
  });
  /*
  if (req.body.Body == 'start') {
    twiml.message("Game started!");
  } else {
    twiml.message("I don't recognize that!");
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  */
});

var port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  var server = app.listen(port, function() {
    console.log("App listening!");
  });
});
