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

  var specPath, specWalker, walker;

  specPath = req.param('path');
  specWalker = new SpecWalker(specDirPath);
  if(specPath) {
    walker = specWalker.getSpecFilesByRootDir(specPath);
    walker.on('finished', function(data){
      renderResponse(res, specWalker, data, specPath);
    });
  } else {
    renderResponse(res, specWalker, [], specPath);
  }
});

renderResponse = function(res, specWalker, data, specPath) {

  var walker;

  walker = specWalker.generateJson();
  walker.on('finished', function(treeData){
    res.render('spec', {
      'specPath': specPath,
      'files': data,
      'specTree': treeData,
      'showEventCount': nconf.get('showEventCount'),
      'showUndisposedObject': nconf.get('showUndisposedObject')
    });
  });
}
app.listen(nconf.get('port'));
console.log('\nserver started at http://localhost:' + nconf.get('port'));
