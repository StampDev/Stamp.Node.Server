/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="metadatastore.ts" />
var sequelize = require('./breeze_sequelize');
var breeze = require('breeze-client');
var Q = require('q');
var metastore = require('./metadatastore');
var ajax = require('./ajax_adapter');
breeze.config.initializeAdapterInstance('ajax', 'bushido_ajax', true);
sequelize.Instance_Manager.importMetadata(metastore.DataStore.Store.exportMetadata());
exports.executeQuery = function (query) {
    var src_query = new sequelize.breeze.EntityQuery(query);
    var exec_query = new sequelize.SequelizeQuery(sequelize.Instance_Manager, src_query);
    var d = Q.defer();
    exec_query.execute().then(function (rst) {
        return d.resolve(rst);
    });
    return d.promise;
};
exports.SaveChanges = function (SaveBundle) {
    return sequelize.SequelizeSaveHandler.save(sequelize.Instance_Manager, {
        body: {
            entities: JSON.parse(SaveBundle).entities,
        }
    });
};
//# sourceMappingURL=sequelize_context.js.map