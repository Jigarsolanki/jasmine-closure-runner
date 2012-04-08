var walk = require('walk'),
  fs = require('fs'),
  options,
  walker,
  tree;

options = {
    followLinks: false,
};
rootDir = 'root';
tree = {};
tree[rootDir] = {};
walker = walk.walk(rootDir, options);

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

walker.on("directories", function (root, dirStatsArray, next) {
  var treeRoot;
  treeRoot = getTreeRoot(root);
  for(var i=0; i< dirStatsArray.length; i++) {
    treeRoot[dirStatsArray[i].name] = {};
  }
  next();
});

walker.on('end', function() {
    console.log(JSON.stringify(tree));
});
