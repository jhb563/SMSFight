function Health(health) {
  this.health = health;
}

Health.prototype.subtractHealth = function(amt) {
  this.health -= amt;
  return this.health;
};

module.exports = Health;