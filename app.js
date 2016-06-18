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
