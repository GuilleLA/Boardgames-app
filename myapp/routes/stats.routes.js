var express         = require('express');
var router          = express.Router();
var statsController = require('../controllers/stats.controller')
const secure        = require('../middlewares/secure.mid');


/* GET users listing. */
router.get('/', secure.isAuthenticated, statsController.stats);
router.get('/coordinates', secure.isAuthenticated, statsController.coordinates);

module.exports = router;
