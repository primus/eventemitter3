'use strict';

const sauceBrowsers = require('sauce-browsers');
const run = require('sauce-test');
const path = require('path');

const pkg = require('../package');

const platforms = sauceBrowsers([
  { name: 'android', version: ['oldest', 'latest'] },
  { name: 'chrome', version: ['oldest', 'latest'] },
  { name: 'firefox', version: ['oldest', 'latest'] },
  { name: 'internet explorer', version: 'oldest..latest' },
  { name: 'iphone', version: ['oldest', 'latest'] },
  { name: 'opera', version: 'oldest..latest' },
  { name: 'safari', version: 'oldest..latest' },
  { name: 'microsoftedge', version: 'oldest..latest' }
]).then((platforms) => {
  return platforms.map((platform) => {
    return {
      browserName: platform.api_name,
      version: platform.short_version,
      platform: platform.os
    };
  });
});

run(path.join(__dirname, 'test.js'), 'saucelabs', {
  html: path.join(__dirname, 'index.html'),
  accessKey: process.env.SAUCE_ACCESS_KEY,
  username: process.env.SAUCE_USERNAME,
  browserify: true,
  disableSSL: true,
  name: pkg.name,
  parallel: 5,
  platforms
}).done((results) => {
  if (!results.passed) process.exit(1);
});
