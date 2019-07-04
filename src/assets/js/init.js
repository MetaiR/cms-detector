if (typeof module === 'object') { window.module = module; module = undefined; }
window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');
if (window.module) module = window.module;