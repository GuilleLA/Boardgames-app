const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
 
/* GET home page. */
router.get('/', authController.index)

module.exports = router;
