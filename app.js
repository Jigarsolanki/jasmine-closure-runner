#!/usr/bin/node

var express = require('express'),
  SpecWalker = require('spec_walker').SpecWalker,
  nconf = require('nconf');

//TODO: Simlink issue.
var app = express.createServer();
nconf.argv().env().file({ file: './config.json' });

var specDirPath = nconf.get('specRootDir');
app.set('view options', { layout: false});
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/nav', function(req, res){

  var specWalker, walker;

  specWalker = new SpecWalker(specDirPath);

  walker = specWalker.generateJson();
  walker.on('finished', function(data){
    res.render('nav', {specTree: data});
  });
});

app.get('/spec', function (req, res, next) {

  var namespace, specWalker, walker;

  namespace = req.param('path');
  if(namespace) {
    specWalker = new SpecWalker(specDirPath);
    walker = specWalker.getSpecFilesByRootDir(namespace);
    walker.on('finished', function(data){
      res.render('spec', {
        'namespace': namespace,
        'files': data
      });
    });
  } else {
    res.end();
  }
});

app.listen(nconf.get('port'));
