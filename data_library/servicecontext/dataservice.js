/**
 * Created by seyaobey on 22-Nov-15.
 */
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../datacontext/sequelize_context" />
/// <reference path="../datacontext/metadatastore.ts" />
var Q = require('q');
var Sequelize = require('../datacontext/sequelize_context');
var metadastore = require('../datacontext/metadatastore');
var breeze = require('breeze-client');
var DataService = (function () {
    function DataService(entityName) {
        this.entityName = entityName;
    }
    Object.defineProperty(DataService.prototype, "dataManager", {
        get: function () {
            if (!this.dm) {
                this.dm = new breeze.EntityManager({
                    dataService: new breeze.DataService(({
                        serviceName: 'BushidoSrv',
                        hasServerMetadata: false
                    }))
                });
                this.dm.metadataStore.importMetadata(metadastore.DataStore.Store.exportMetadata());
            }
            return this.dm;
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.fill_datamanager = function (data) {
        var _this = this;
        data.forEach(function (d) {
            _this.dataManager.createEntity(_this.entityName, d, breeze.EntityState.Unchanged, breeze.MergeStrategy.OverwriteChanges);
        });
    };
    DataService.prototype.executeQuery = function (query) {
        var _this = this;
        var d = Q.defer();
        Sequelize.executeQuery(query).then(function (rst) {
            if (rst) {
                _this.fill_datamanager(rst);
            }
            return d.resolve(rst);
        });
        return d.promise;
    };
    DataService.prototype.saveChanges = function () {
        var saveBundle = this.dataManager.saveChanges();
        return Sequelize.SaveChanges(saveBundle);
    };
    return DataService;
})();
exports.DataService = DataService;
//# sourceMappingURL=dataservice.js.map