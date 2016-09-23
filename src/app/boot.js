"use strict";
require('core-js');
require('zone.js/dist/zone');
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var http_1 = require("angular2/http");
var router_1 = require('angular2/router');
var app_1 = require('./app');
var state_service_1 = require('./components/common/state.service');
browser_1.bootstrap(app_1.default, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    http_1.HTTP_PROVIDERS,
    state_service_1.default
]);
//# sourceMappingURL=boot.js.map