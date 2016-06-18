var express = require('express');
var Health = require('./health.js');
var app = express();

app.get('/', function(req, res) {
    res.send("Hello");
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log("App listening!");
});
var startGame = false;

var player1;
var player2;

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

if (!startGame) {
  choosePlayers();
  sendRules();
  startGame = true;
} else {
  eachRound(move);
}


function choosePlayers() {
  player1 = {
    health: new Health(20),
    winResponse: 'Winner winner chicken dinner'
  };
  player2 = {
    health: new Health(20),
    winResponse: 'Sky net win'
  };
}

function sendRules() {

}

function textResponse(){

}

function eachRound(move) {
  var response = '';

  playGame(player1, move);
  checkHealth(player1, player2);
  playGame(player2, randomMove());
  checkHealth(player2, player1);

  response = ``;

  textResponse();
}

function checkHealth(player, opponent){
  if (opponent.health <= 0){
    // Declare winner
    textResponse(player.winResponse);
  }
}

function playGame(player, move){
  // Is this a move
  isMove(move);

  // Did we hit
  if (didHit(move)) {
    //subtract x from total health of opponent
    player.subtractHealth(MOVES.move.damage);
  }
  else
    //sorry you missed

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
  var successHit = randomNumber(MOVES.move.ranMin, MOVES.move.ranMax);
  return (successHit >= MOVES.move.successMin && successHit <= MOVES.move.successMax);
}

// function isMove(move) {
//   // If not a move return sorry not a move
//   if (!MOVES[move]) {
//     //return sorry that is not a move
//   }
// }
//