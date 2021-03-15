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
  { name: 'safari', version: ['oldest', 'latest'] },
  { name: 'microsoftedge', version: ['oldest', 'latest'] }
]).then((platforms) => {
  return platforms.map((platform) => {
    const ret = {
      browserName: platform.api_name,
      version: platform.short_version,
      platform: platform.os
    };

    if (ret.browserName === 'android') ret.deviceName = platform.long_name;

    return ret;
  });
});

run(path.join(__dirname, 'test.js'), 'saucelabs', {
  jobInfo: { name: pkg.name, build: process.env.GITHUB_RUN_ID },
  html: path.join(__dirname, 'index.html'),
  accessKey: process.env.SAUCE_ACCESS_KEY,
  username: process.env.SAUCE_USERNAME,
  browserify: true,
  disableSSL: true,
  parallel: 5,
  platforms
}).done((results) => {
  if (!results.passed) process.exit(1);
});
