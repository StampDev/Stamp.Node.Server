/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="sequelize_context.ts" />
var Context = require('./sequelize_context');
var Q = require('q');
(function (factory) {
    var breezeSequelize = require('breeze-sequelize');
    module.exports = factory(breezeSequelize.breeze);
}(function (breeze) {
    "use strict";
    var core = breeze.core;
    var jQuery;
    var ctor = function AjaxJQueryAdapter() {
        this.name = "bushido_ajax";
        this.defaultSettings = {};
        this.requestInterceptor = null;
    };
    var proto = ctor.prototype;
    proto.initialize = function () {
        // look for the jQuery lib but don't fail immediately if not found
        jQuery = core.requireLib("jQuery");
    };
    proto.ajax = function (config) {
        var d = Q.defer();
        var $data = config.params || config.data;
        if (config.url == 'BushidoSrv/SaveChanges') {
            return Context.SaveChanges($data).then(function (rst) {
                return d.resolve(rst);
            });
        }
        Context.executeQuery($data).then(function (rst) {
            return d.resolve(rst);
        }).catch(function (err) {
            d.reject(err);
        });
        return d.promise;
    };
    function getHeadersFn(jqXHR) {
        if (jqXHR.status === 0) {
            return function (headerName) {
                return (headerName && headerName.length > 0) ? "" : {};
            };
        }
        else {
            return function (headerName) {
                return (headerName && headerName.length > 0) ?
                    jqXHR.getResponseHeader(headerName) :
                    jqXHR.getAllResponseHeaders();
            };
        }
    }
    breeze.config.registerAdapter("ajax", ctor);
    return ctor;
}));
//# sourceMappingURL=ajax_adapter.js.map