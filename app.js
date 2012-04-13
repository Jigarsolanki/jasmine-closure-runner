var express = require('express'),
  SpecTreeGenerator = require('spec_tree_generator').SpecTreeGenerator;

var path = '/Users/jigarsolanki/Documents/Projects/Reach/reach/cloudkick/webapp/site_media/js/spec/';
var app = express.createServer();

app.set('view options', {
  layout: false
});
app.set('view engine', 'jade');

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/nav', function(req, res){

  var specTreeGenerator = new SpecTreeGenerator();

  var walker = specTreeGenerator.generate(path);
  walker.on('finished', function(data){
    res.render('nav', {specTree: data});
  });
});

app.get('/spec', function(req, res){
  console.log(req.query['namespace']);
  res.render('spec');
});


app.listen(8080);
