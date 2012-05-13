goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Trace');
goog.require('goog.dom');
goog.require('goog.ui.tree.TreeControl');

objectToArray = function (object) {
  var mainArray;

  mainArray =[];

  if(!goog.object.isEmpty(object)) {
    goog.object.forEach(object, function(value, key){

      var childArray, array;
      array = [];
      array.push(key);
      childArray = objectToArray(value);
      if(!goog.array.isEmpty(childArray)){
        array.push(childArray);
      }
      mainArray.push(array);
    });
  }
  return mainArray;
};

setPathToLocalStorage = function(path) {
  var expanded;

  expanded = JSON.parse(localStorage.getItem('expanded'));
  if(!expanded) {
    expanded = {'paths': []};
  }
  expanded['paths'].push(path);
  localStorage.setItem('expanded', JSON.stringify(expanded));
};

removePathFromLocalStorage = function(path) {
  var expanded;

  expanded = JSON.parse(localStorage.getItem('expanded'));
  if(!expanded) {
    expanded = {'paths': []};
  }
  goog.array.remove(expanded['paths'],(path));
  localStorage.setItem('expanded', JSON.stringify(expanded));
};

pathFromItem = function(item, root) {

  var path, parent;

  parent = item.getParent();
  path = item.getText();
  while(parent) {
    path =  parent.getText() + "/" + path;
    parent = parent.getParent();
  }
  return path;
};

shouldExapnd = function (path) {

  var expand, expanded;

  expand = false;
  expanded = JSON.parse(localStorage.getItem('expanded'));
  if(!expanded) {
    return false;
  }

  return goog.array.contains(expanded['paths'], path);
};

createTreeFromTestData = function(node, data) {

  var expand;

  node.setHtml(data[0]);
  if (data.length > 1) {
    var children = data[1];
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var childNode = node.getTree().createNode('');

      node.add(childNode);
      createTreeFromTestData(childNode, child);
    }
  }
  if(shouldExapnd(pathFromItem(node, data[0]))){
    node.setExpanded(true);
  }
};

makeTree = function () {
  var treeConfig = goog.ui.tree.TreeControl.defaultConfig;
  specTree = new goog.ui.tree.TreeControl('root', treeConfig);

  createTreeFromTestData(specTree,  objectToArray(tree)[0]);

  specTree.render(goog.dom.getElement('treeContainer'));
  specTree.setSelectedItem(null);
  goog.events.listen(specTree, goog.events.EventType.CHANGE, function(e){

    var treePath;

    treePath = "/?path=" +
      pathFromItem(e.target.getSelectedItem(), e.target.getText());
    window.location.href = treePath;
  });

  goog.events.listen(specTree,
    goog.ui.tree.BaseNode.EventType.EXPAND,
    function(e) {

      var expandedPath;

      expandedPath = pathFromItem(e.target, e.target.getText());
      setPathToLocalStorage(expandedPath);
  });

  goog.events.listen(specTree,
    goog.ui.tree.BaseNode.EventType.COLLAPSE,
    function(e) {

      var expandedPath;

      expandedPath = pathFromItem(e.target, e.target.getText());
      removePathFromLocalStorage(expandedPath);
  });
};

goog.events.listenOnce(
  window,
  goog.events.EventType.LOAD,
  function(){
    makeTree();
  }
);

