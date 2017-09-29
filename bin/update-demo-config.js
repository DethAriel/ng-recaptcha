var path = require('path');
const replace = require('replace-in-file');

var projectDir = path.join(__dirname, '..');
var package = require(path.join(projectDir, 'package.json'));

replace.sync({
  files: path.join(projectDir, 'demo', '_config.yml'),
  from: /cacheBusterVer: \"[0-9\\.]+\"/,
  to: 'cacheBusterVer: "' + package.version + '"',
});
