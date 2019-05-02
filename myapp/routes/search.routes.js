const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const secure = require('../middlewares/secure.mid')
 
/* GET home page. */
router.get('/search', secure.isAuthenticated, searchController.search);

console.log('RUTA: ', router.stack[0].route.path);

module.exports = router;