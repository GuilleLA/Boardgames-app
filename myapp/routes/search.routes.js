const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const secure = require('../middlewares/secure.mid')
 
/* GET home page. */
router.get('/', secure.isAuthenticated, searchController.search);

//router.get('/search-game-filter', secure.isAuthenticated, searchController.searchGameFilter);

module.exports = router;