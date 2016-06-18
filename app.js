var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send("Hello");
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log("App listening!");
});
