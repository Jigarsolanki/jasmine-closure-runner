goog.require('goog.object');
goog.require('goog.array');

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
