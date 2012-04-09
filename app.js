var express = require('express');

var app = express.createServer();

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
 res.render('index.jade', {specTree: 'JRunner'});
});

app.listen(8080);
