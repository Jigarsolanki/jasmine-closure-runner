var walk = require('walk'),
  fs = require('fs'),
  walker,
  tree;

var rootDir = '/Users/jigarsolanki/Documents/Projects/Reach/reach/cloudkick/webapp/site_media/js/spec/';
rootDir = rootDir.lastIndexOf('/') === (rootDir.length - 1) ?
  rootDir.substring(0, rootDir.length - 1): rootDir;
var baselimit = rootDir.lastIndexOf('/') + 1;

getTreeRoot = function(path) {
  var treeRoot;

  if(path === rootDir) {
    return tree[rootDir];
  } else {
    var paths = path.split('/');
    treeRoot = tree;
    for(var i =0; i < paths.length; i++) {
      treeRoot = treeRoot[paths[i]];
    }
    return treeRoot;
  }
};

tree = {};
var jsonRoot = rootDir.substring(baselimit);
tree[jsonRoot] = {};
walker = walk.walk(rootDir, { followLinks: false });

walker.on("directories", function (root, dirStatsArray, next) {
  var treeRoot;
  treeRoot = getTreeRoot(root.substring(baselimit));
  for(var i=0; i< dirStatsArray.length; i++) {
    treeRoot[dirStatsArray[i].name] = {};
  }
  next();
});

walker.on('end', function() {
  console.log(JSON.stringify(tree));
});
