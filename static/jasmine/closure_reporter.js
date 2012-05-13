goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.ui.Control');
goog.require('goog.style');

jasmine.ClosureReporter = function(showEventCount, showUndisposedObject) {
  this.showEventCount_ = showEventCount;
  this.showUndisposedObject_ = showUndisposedObject;
};

jasmine.ClosureReporter.prototype.eventCountBefore_ = 0;
jasmine.ClosureReporter.prototype.showEventCount_ = false;
jasmine.ClosureReporter.prototype.showUndisposedObject_ = false;

jasmine.ClosureReporter.prototype.reportRunnerStarting = function(runner){
  goog.Disposable.ENABLE_MONITORING = this.showUndisposedObject_;
  this.eventCountBefore_ =  goog.events.getTotalListenerCount();
};

jasmine.ClosureReporter.prototype.reportRunnerResults = function(spec) {

  var eventDiv, content, objectDiv, listenerCount;

  eventDiv = goog.dom.getElement('total_events');
  if(this.showEventCount_) {
    listenerCount = goog.events.getTotalListenerCount() - this.eventCountBefore_;
    goog.dom.setTextContent(eventDiv, listenerCount);
    if(listenerCount > 0) {
      goog.dom.classes.add(goog.dom.getElement('stats'), 'warning');
    }
  }

  objectDiv = goog.dom.getElement('total_undisposed_object');
  if(this.showUndisposedObject_){
  goog.dom.setTextContent(objectDiv,
    goog.Disposable.getUndisposedObjects().length);
}
};
