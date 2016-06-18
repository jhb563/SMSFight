var express = require('express');
var Health = require('./health.js');
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

      game.player1.winResponse =  'Winner winner chicken dinner';
      game.player2.winResponse =  'Sky net win';
      eachRound(twiml, game, message);
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
var startGame = false;

var boilerplateStarters = [
  'Your face has been', 'You just got', 'You\'ve been'
];

var boilerplateEnders = [
  'into oblivion', 'to dust', 'copius amounts', 'to the ground'
];

var punchVariation = [
  'hadoukened', 'punched', 'slapped', 'bitch slapped', 'jabbed'
];

var kickVariation = [
  'kicked', 'stomped', 'sonic boomed', 'walloped'
];

var emojis = ['💥', '💢', '💪', '😈', '🙀']

var MOVES =  {
  punch: {
    ranMin: 1,
    ranMax: 10,
    successMin: 4,
    successMax: 10,
    damage: 1,
  },
  kick: {
    ranMin: 1,
    ranMax: 5,
    successMin: 1,
    successMax: 3,
    damage: 3
  }
};

function textResponse(twiml, response){
  //text to user
  twiml.message(response);
}

function eachRound(twiml, game, move) {
  var response = '';
  var continueGame = true;
  var player1 = game.player1;
  var player2 = game.player2;
  console.log(game);

  playGame(twiml, player1, move);
  continueGame = checkHealth(player1, player2);

  if (!continueGame) {
    return;
  }

  playGame(twiml, player2, randomMove());
  continueGame = checkHealth(player2, player1);

  if (!continueGame) {
    return;
  }

  response = `${aiMoveResponse(move)}
  Your is health is ${player1.health}
  AI's health is ${player2.health}`;
  console.log(response);
  textResponse(twiml, response);
}

function checkHealth(twiml, player, opponent){
  if (opponent.health <= 0){
    // Declare winner
    textResponse(twiml, player.winResponse);
    console.log(player.winResponse);
    return false;
  }
  return true;
}

function playGame(twiml, player, move){

  // Did we hit
  if (didHit(move)) {
    //subtract x from total health of opponent
    player.health -= MOVES[move].damage;
  }
  else{
    textResponse(twiml, 'sorry you missed');
  }

}

function randomNumber(min, max) {
  // return random number within a range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomMove() {
  // return random move for ai
  var aiMoveNum = randomNumber(1,2);
  if (aiMoveNum === 1) {
    return 'punch';
  } else if (aiMoveNum === 2) {
    return 'kick';
  }
}

function didHit(move) {
  // based on move did we hit?
  var successHit = randomNumber(MOVES[move].ranMin, MOVES[move].ranMax);
  return (successHit >= MOVES[move].successMin && successHit <= MOVES[move].successMax);
}

function aiMoveResponse(move) {
  if (move === 'punch') {
    return randomPunchResponse();
  } else if (move === 'kick') {
    return randomKickResponse();
  }
}

function randomPunchResponse() {
  return '👊  ' + boilerplateStarters[randomNumber(0, boilerplateStarters.length - 1)] + ' ' + punchVariation[randomNumber(0, punchVariation.length - 1)] + ' ' +  boilerplateEnders[randomNumber(0, boilerplateEnders.length - 1)] + '. ' + emojis[randomNumber(0, emojis.length - 1)];
}

function randomKickResponse() {
  return '👣  ' + boilerplateStarters[randomNumber(0, boilerplateStarters.length - 1)] + ' ' + kickVariation[randomNumber(0, kickVariation.length - 1)] + ' ' +  boilerplateEnders[randomNumber(0, boilerplateEnders.length - 1)] + '. ' + emojis[randomNumber(0, emojis.length - 1)];
}
