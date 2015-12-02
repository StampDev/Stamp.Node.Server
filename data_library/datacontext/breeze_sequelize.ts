/// <reference path="../../typings/tsd.d.ts" />


import _ = require('lodash');
var Q = require('q');

var breezeSequelize = require('breeze-sequelize');

export var SequelizeManager = breezeSequelize.SequelizeManager;

export var SequelizeQuery = breezeSequelize.SequelizeQuery;

export var SequelizeSaveHandler = breezeSequelize.SequelizeSaveHandler;

export var breeze = breezeSequelize.breeze;

// !!!! το sql user πρέπει να είναι public και system admin ( βλεπε Security/Logins/ [user]/ properties / Server roles

export var Instance_Manager = new SequelizeManager({
        dbName: 'StampDB',
        user: 'stamp',
        password: 'BoniFace1.'
    },
    {     
        host: 'P1EOBEY',   
        dialect: 'mssql',
        //servername: 'P1EOBEY\MSSQLSERVER_2012',
        //serverName: 'P1EOBEY\MSSQLSERVER_2012',
        port: 1443,
        dialectOptions: {
            instanceName: 'MSSQLSERVER_2012'
        },                
    });
