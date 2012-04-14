var walk = require('walk');

walker = walk.walk('./static/external/spec/ck/billing/billing_app_spec.js', { followLinks: true });
walker.on("file", function (root, dirStatsArray, next) {
  console.log(root+ "/" +dirStatsArray.name);
  next();
});
walker.on('end', function() {
  console.log('finished');
});
