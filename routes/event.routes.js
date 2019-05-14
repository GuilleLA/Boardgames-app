const express        = require('express');
const router         = express.Router();
const eventController = require('../controllers/event.controller');
const secure         = require('../middlewares/secure.mid')
const storage        = require('../config/storage.config');

router.get('/create', secure.isAuthenticated, eventController.create)
router.post('/doCreate', secure.isAuthenticated, storage.single('image'), eventController.doCreate)


router.get('/:id', secure.isAuthenticated, eventController.detail)
router.get('/:id/coordinates', secure.isAuthenticated, eventController.coordinates)
router.post('/:id/join', secure.isAuthenticated, eventController.join)
router.post('/:id/cancel', secure.isAuthenticated, eventController.cancel)
router.post('/:id/:uid/remove', secure.isAuthenticated, eventController.remove)

router.get('/', secure.isAuthenticated, eventController.list)

module.exports = router;