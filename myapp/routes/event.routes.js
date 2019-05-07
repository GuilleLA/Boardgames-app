const express        = require('express');
const router         = express.Router();
const eventController = require('../controllers/event.controller');
const secure         = require('../middlewares/secure.mid')
const storage        = require('../config/storage.config');

router.get('/create', secure.isAuthenticated, eventController.create)
router.post('/doCreate', secure.isAuthenticated, storage.single('image'), eventController.doCreate)
router.get('/:id', secure.isAuthenticated, eventController.detail)
router.get('/', secure.isAuthenticated, eventController.list)

module.exports = router;