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

createTreeFromTestData = function(node, data) {
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
};

makeTree = function () {
  var treeConfig = goog.ui.tree.TreeControl.defaultConfig;
  specTree = new goog.ui.tree.TreeControl('root', treeConfig);

  createTreeFromTestData(specTree,  objectToArray(tree)[0]);

  specTree.render(goog.dom.getElement('treeContainer'));
  goog.events.listen(specTree, goog.events.EventType.CHANGE, function(e){
    console.log('adfasdfafasdasdfasdfasasdffds');
    var buildPath = function(item, root) {

      var path, parent;

      parent = item.getParent();
      path = item.getText()
      while(parent) {
        path =  parent.getText() + "/" + path;
        parent = parent.getParent();
      }
      return path;
    };

    window.location.href  = "/spec?path=" +
      buildPath(e.target.getSelectedItem(), e.target.getText());
  });
};

goog.events.listenOnce(
  window,
  goog.events.EventType.LOAD,
  function(){
    makeTree();
  });

