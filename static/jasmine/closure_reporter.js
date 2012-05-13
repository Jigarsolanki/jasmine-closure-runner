goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.ui.Control');

jasmine.ClosureReporter = function() {
  //goog.Disposable.ENABLE_MONITORING = true;
};

jasmine.ClosureReporter.prototype.reportRunnerResults = function(spec) {

  var eventDiv, content, objectDiv, listenerCount;

  listenerCount = goog.events.getTotalListenerCount();
  eventDiv = goog.dom.getElement('total_events');
  goog.dom.setTextContent(eventDiv, listenerCount);
  if(listenerCount > 0) {
    goog.dom.classes.add(goog.dom.getElement('stats'), 'warning');
  }
  objectDiv = goog.dom.getElement('total_undisposed_object');
  goog.dom.setTextContent(objectDiv,
    goog.Disposable.getUndisposedObjects().length);
};
