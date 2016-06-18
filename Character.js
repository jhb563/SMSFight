var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  health : Number
});

var Character = mongoose.model('characters', characterSchema);
module.exports = {
  Character: Character,
  characterSchema: characterSchema
};
