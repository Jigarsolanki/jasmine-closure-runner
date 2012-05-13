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

app.get('/', function (req, res, next) {

  var namespace, specWalker, walker;

  namespace = req.param('path');
  if(namespace) {
    specWalker = new SpecWalker(specDirPath);
    walker = specWalker.getSpecFilesByRootDir(namespace);
    walker.on('finished', function(data){
      walker2 = specWalker.generateJson();
      walker2.on('finished', function(treeData){
        res.render('spec', {
          'namespace': namespace,
          'files': data,
          'specTree': treeData
        });
      });
    });
  } else {
    res.end();
  }
});

app.listen(nconf.get('port'));
console.log('\nserver started at http://localhost:' + nconf.get('port'));
