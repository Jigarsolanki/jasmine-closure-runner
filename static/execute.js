window.onload = function() {
  jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
  jasmine.getEnv().addReporter(new jasmine.ClosureReporter(
    showEventCount, showUndisposedObject));
  jasmine.getEnv().execute();
}
