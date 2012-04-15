var express = require('express'),
  SpecWalker = require('spec_walker').SpecWalker,
  nconf = require('nconf');

//TODO: Simlink issue
var app = express.createServer();
nconf.argv().env().file({ file: './config.json' });

var specDirPath = nconf.get('specDirPath');

app.set('view options', { layout: false});
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/nav', function(req, res){

  var specWalker, walker;

  specWalker = new SpecWalker();

  walker = specWalker.generateJson(specDirPath);
  walker.on('finished', function(data){
    res.render('nav', {specTree: data});
  });
});

app.get('/spec', function (req, res, next) {

  var namespace, specWalker, walker;

  namespace = req.param('namespace');
  if(namespace) {
    namespace = namespace.replace(/-/g,'/');
    specWalker = new SpecWalker();
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

app.listen(8080);
