const express        = require('express');
const router         = express.Router();
const gameController = require('../controllers/game.controller');
const secure         = require('../middlewares/secure.mid')
const storage        = require('../config/storage.config');
 
/* GET home page. */

router.get('/addGame', gameController.addGame)

router.get('/:id', secure.isAuthenticated, gameController.details);

router.get('/:id/update', gameController.update)
router.post('/:id/doUpdate', gameController.doUpdate)

router.post('/:id/add', gameController.add)
router.post('/:id/wish', gameController.wish)
router.post('/:id/change', gameController.change)
router.post('/:id/removeOwned', gameController.removeOwned)
router.post('/:id/removeWish', gameController.removeWish)
router.post('/:id/removeChange', gameController.removeChange)
router.post('/:id/addComment', gameController.addComment)

module.exports = router;