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
var startGame = true;

var player1;
var player2;

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

if (!startGame) {
  choosePlayers();
  sendRules();
  startGame = true;
} else {
  move = 'kick'
  choosePlayers(); // remove for testing
  eachRound(move);
}


function choosePlayers() {
  player1 = {
    health: new Health(3),
    winResponse: 'Winner winner chicken dinner'
  };
  player2 = {
    health: new Health(20),
    winResponse: 'Sky net win'
  };
  console.log('player1 ', player1);
  console.log('player2 ', player2);
}

function sendRules() {
  console.log('send rules');
}

function textResponse(){

}

function eachRound(move) {
  var response = '';
  var continueGame = true;

  playGame(player1, move);
  continueGame = checkHealth(player1, player2);

  if (!continueGame) {
    return;
  }

  playGame(player2, randomMove());
  continueGame = checkHealth(player2, player1);

  if (!continueGame) {
    return;
  }

  response = `${aiMoveResponse(move)}
  Your is health is ${player1.health.health}
  AI's health is ${player2.health.health}`;
  console.log(response);
  textResponse(response);
}

function checkHealth(player, opponent){
  if (opponent.health.health <= 0){
    // Declare winner
    textResponse(player.winResponse);
    console.log(player.winResponse);
    return false;
  }
  return true;
}

function playGame(player, move){

  // Did we hit
  if (didHit(move)) {
    //subtract x from total health of opponent
    player.health.subtractHealth(MOVES[move].damage);
    console.log(`Subtracted ${MOVES[move].damage} from player`);
  }
  else{
    console.log('sorry you missed');
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
