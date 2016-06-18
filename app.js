var express = require('express');
var Health = require('./health.js')
var app = express();

app.get('/', function(req, res) {
    res.send("Hello");
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log("App listening!");
});

var MOVES =  {
  punch: true,
  kick: true
};

// playGame('person', move);
// playGame('ai', randomMove);
//
// function playGame(move){
//   // Is this a move
//   isMove(move);
//
//   // Did we hit
//   if (didHit(move)) {
//     //subtract x from total health of opponent
//   }
//   else
//     //sorry you missed
//
//   // Is the game over
//   if (oponentsHealth < 0) {
//     //you lose win
//   }
// }

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

// function isMove(move) {
//   // If not a move return sorry not a move
//   if (!MOVES[move]) {
//     //return sorry that is not a move
//   }
// }
//
// function didHit(move) {
//   // based on move did we hit?
//   return // random did we hit
// }
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

function aiMoveResponse(move) {
  if (move === 'punch') {
    randomPunchResponse();
  } else if (move === 'kick') {
    randomPunchResponse();
  }
}

function randomPunchResponse() {
  return '👊  ' + boilerplateStarters[randomNumber(0, boilerplateStarters.length - 1)] + ' ' + punchVariation[randomNumber(0, punchVariation.length - 1)] + ' ' +  boilerplateEnders[randomNumber(0, boilerplateEnders.length - 1)] + '. ' + emojis[randomNumber(0, emojis.length - 1)];
}

function randomKickResponse() {
  return '👣  ' + boilerplateStarters[randomNumber(0, boilerplateStarters.length - 1)] + ' ' + kickVariation[randomNumber(0, kickVariation.length - 1)] + ' ' +  boilerplateEnders[randomNumber(0, boilerplateEnders.length - 1)] + '. ' + emojis[randomNumber(0, emojis.length - 1)];
}
