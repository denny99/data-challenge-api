/**
 * Created by admin on 20.12.16.
 */
var express = require('express');
var router  = express.Router();

var MASTER_ROUTE = "/translator";

Xing      = require('./../controllers/XingService');
Glassdoor = require('./../controllers/GlassdoorService');
Adzuna    = require('./../controllers/AdzunaService');

router.use(MASTER_ROUTE + "/xing/getById", Xing.getById);
router.use(MASTER_ROUTE + "/xing/find", Xing.find);
router.use(MASTER_ROUTE + "/adzuna/search", Adzuna.search);
router.use(MASTER_ROUTE + "/glassdoor/estimate", Glassdoor.estimate);

module.exports = router;