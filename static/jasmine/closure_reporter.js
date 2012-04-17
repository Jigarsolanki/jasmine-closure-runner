goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');

jasmine.ClosureReporter = function() {
};

jasmine.ClosureReporter.prototype.reportRunnerResults = function(spec) {

  var beforeDiv, content;

  beforeDiv = document.createElement('div');
  beforeDiv['className'] = "eventCounter";
  content = "Total Event Listeners: " + goog.events.getTotalListenerCount();
  goog.dom.setTextContent(beforeDiv, content);
  goog.dom.appendChild(document.body,beforeDiv);
};
