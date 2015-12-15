/// <reference path="../../typings/tsd.d.ts" />
var Q = require('q');
var breezeSequelize = require('breeze-sequelize');
exports.SequelizeManager = breezeSequelize.SequelizeManager;
exports.SequelizeQuery = breezeSequelize.SequelizeQuery;
exports.SequelizeSaveHandler = breezeSequelize.SequelizeSaveHandler;
exports.breeze = breezeSequelize.breeze;
// !!!! το sql user πρέπει να είναι public και system admin ( βλεπε Security/Logins/ [user]/ properties / Server roles
exports.Instance_Manager = new exports.SequelizeManager({
    dbName: 'StampDB',
    user: 'stamp',
    password: 'BoniFace1.'
}, {
    host: 'P1EOBEY',
    dialect: 'mssql',
    //servername: 'P1EOBEY\MSSQLSERVER_2012',
    //serverName: 'P1EOBEY\MSSQLSERVER_2012',
    port: 1443,
    dialectOptions: {
        instanceName: 'MSSQLSERVER_2012'
    },
});
//# sourceMappingURL=breeze_sequelize.js.map