'use strict';

var component = require('./component.json')
  , node = require('./package.json')
  , bower = require('./bower.json');

//
// Force version number syncing
//
if (component.version !== node.version || bower.version !== node.version) {
  console.error('package.json version:    ', node.version);
  console.error('component.json version:  ', component.version);
  console.error('bower.json version:      ', bower.version);

  throw new Error('The `package.json`, `bower.json` and `component.json` version numbers should be in sync');
}
