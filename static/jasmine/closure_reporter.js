goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');

jasmine.ClosureReporter = function() {
  //goog.Disposable.ENABLE_MONITORING = true;
};

jasmine.ClosureReporter.prototype.reportRunnerResults = function(spec) {

  var eventDiv, content, objectDiv;

  eventDiv = goog.dom.createDom('div', "eventCounter");
  content = "Total Event Listeners: " + goog.events.getTotalListenerCount();
  goog.dom.setTextContent(eventDiv, content);
  goog.dom.appendChild(document.body,eventDiv);

  objectDiv = goog.dom.createDom('div', "objectCounter");
  content = "Total Undisposed Objects: " + goog.Disposable.getUndisposedObjects().length;
  goog.dom.setTextContent(objectDiv, content);
  goog.dom.appendChild(document.body,objectDiv);
};
