const path = require('path');

module.exports = {
    target: 'electron-renderer',
    // don't remove this comments it is used for parsing by postinstall.config.js
    // start of extra configs
    externals: {
        jsdom: "require('jsdom')"
    },
    resolve: {
        alias: {
        }
    }
    // end of extra configs
};