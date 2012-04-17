window.onload = function() {
  jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
  jasmine.getEnv().addReporter(new jasmine.ClosureReporter());
  jasmine.getEnv().execute();
}
