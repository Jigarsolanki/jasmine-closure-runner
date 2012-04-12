var express = require('express'),
  SpecTreeGenerator = require('spec_tree_generator').SpecTreeGenerator;

var path = '/Users/jigarsolanki/Documents/Projects/Reach/reach/cloudkick/webapp/site_media/js/spec';
var app = express.createServer();

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){

  var specTreeGenerator = new SpecTreeGenerator();

  var walker = specTreeGenerator.generate(path);
  walker.on('finished', function(data){
    res.render('index.jade', {specTree: data});
  });
});

app.listen(8080);
