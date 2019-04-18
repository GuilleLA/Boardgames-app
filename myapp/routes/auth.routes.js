const express = require('express');
const router = express.Router();
const authConroller = require('../controllers/auth.controller')
 
/* GET home page. */
router.get('/', authConroller.index)

module.exports = router;
