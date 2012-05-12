#!/usr/bin/node

var nconf = require('nconf'),
  fs = require('fs'),
  path = require('path');

  nconf.argv().env().file({ file: './config.json' });
  var linkPath = path.join(this.root, 'static/external'),
    jsRootPath = nconf.get('JSRoot');
  path.exists(jsRootPath, function(exists) {
    fs.symlink(path.resolve(jsRootPath), path.resolve(linkPath), function(a){
      if(a){
        console.log('Looks like you are good to go!');
      } else {
        console.log('finished!');
      }
    });
  });

