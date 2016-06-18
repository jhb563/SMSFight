function Health() {
  this.health = 20;
}

Health.prototype.subtractHealth = function(amt) {
  this.health -= amt;
  return this.health;
}

module.exports = Health;
