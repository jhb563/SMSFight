var express = require('express');
var Health = require('./health.js')
var app = express();

app.get('/', function(req, res) {
    res.send("Hello");
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  // var test = new Health();
  // test.subtractHealth(3);
  // console.log(test.health);
  console.log("App listening!");
});
var startGame = false;
var MOVES =  {
  punch: {

  },
  kick: true
};

if (!startGame) {
  choosePlayers();
  sendRules();
  startGame = true;
} else {
  eachRound();
}


function choosePlayers() {
  if (randomeNumber(0,1)) {
    player1 = 'player';
    player2 = 'ai';
  } else {
    player1 = 'ai';
    player2 = 'player';
  }
}

function sendRules() {

}

function eachRound() {
  playGame(player1, move);
  playGame(player2, move);
}


function playGame(move){
  // Is this a move
  isMove(move);

  // Did we hit
  if (didHit(move)) {
    //subtract x from total health of opponent
  }
  else
    //sorry you missed

  // Is the game over
  if (oponentsHealth < 0) {
    //you lose win
  }
}

function randomNumber(min, max) {
  // return random number
}

function randomMove() {
  // return random move for ai
}


function isMove(move) {
  // If not a move return sorry not a move
  if (!MOVES[move]) {
    //return sorry that is not a move
  }
}

function didHit(move) {
  // based on move did we hit?
  return // random did we hit
}



