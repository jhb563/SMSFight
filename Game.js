var mongoose = require('mongoose');
var Character = require('./Character.js');

var gameSchema = mongoose.Schema({
  player1: Character.characterSchema,
  player2: Character.characterSchema,
  phoneNumber: String
});

var Game = mongoose.model('games', gameSchema);
module.exports = {
  Game: Game,
  gameSchema, gameSchema
};
