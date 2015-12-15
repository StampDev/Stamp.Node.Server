/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../data_library/datacontext/sequelize_context.ts" />
var Express = require('express');
var Sequelize = require('../data_library/datacontext/sequelize_context');
var breeze = require('breeze-client');
var router = Express.Router();
router.get('/', function (req, res) {
    var query = breeze.EntityQuery.from('occp');
    Sequelize.executeQuery(query).then(function (rst) {
        if (rst) {
            var l = rst.length;
        }
        //return d.resolve(rst);
    });
});
module.exports = router;
//# sourceMappingURL=app_routes.js.map