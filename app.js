var express = require('express'),
  SpecWalker = require('spec_walker').SpecWalker;

//TODO: make a config file
//TODO: Simlink issue
var path = '/Users/jigarsolanki/Documents/Projects/Reach/reach/cloudkick/webapp/site_media/js/spec/';
var app = express.createServer();

app.set('view options', { layout: false});
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/nav', function(req, res){

  var specWalker, walker;

  specWalker = new SpecWalker();

  walker = specWalker.generateJson(path);
  walker.on('finished', function(data){
    res.render('nav', {specTree: data});
  });
});

app.get('/spec', function (req, res, next) {

  var namespace, specWalker, walker;

  namespace = req.param('namespace') ;
  if(namespace) {
    namespace = namespace.replace(/-/g,'/');
    specWalker = new SpecWalker();
    walker = specWalker.getSpecFilesByNameSpace(namespace);
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
