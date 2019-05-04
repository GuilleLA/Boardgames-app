const express        = require('express');
const router         = express.Router();
const gameController = require('../controllers/game.controller');
const secure         = require('../middlewares/secure.mid')
const storage        = require('../config/storage.config');
 
/* GET home page. */

router.get('/addGame', secure.isAuthenticated, gameController.addGame)
router.post('/doAddGame', secure.isAuthenticated, storage.single('image'), gameController.doAddGame)

router.get('/:id', secure.isAuthenticated, gameController.details);

router.get('/:id/update', secure.isAuthenticated, gameController.update)
router.post('/:id/add', secure.isAuthenticated, gameController.add)
router.post('/:id/wish', secure.isAuthenticated, gameController.wish)
router.post('/:id/change', secure.isAuthenticated, gameController.change)
router.post('/:id/removeOwned', secure.isAuthenticated, gameController.removeOwned)
router.post('/:id/removeWish', secure.isAuthenticated, gameController.removeWish)
router.post('/:id/removeChange', secure.isAuthenticated, gameController.removeChange)
router.post('/:id/addComment', secure.isAuthenticated, gameController.addComment)

module.exports = router;