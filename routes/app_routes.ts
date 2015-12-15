/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../data_library/datacontext/sequelize_context.ts" />


import Express = require('express');
import Sequelize = require('../data_library/datacontext/sequelize_context');
import breeze = require('breeze-client');

var router = Express.Router();

router.get('/', function (req: Express.Request, res: Express.Response) {

    var query = breeze.EntityQuery.from('occp');

    Sequelize.executeQuery(query).then(rst => {

        if (rst) {

            var l = rst.length;

            //this.fill_datamanager(rst)
        } 

        //return d.resolve(rst);
    });

});

module.exports = router;
