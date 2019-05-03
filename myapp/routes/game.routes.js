const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const secure = require('../middlewares/secure.mid')
 
/* GET home page. */

router.get('/:id', secure.isAuthenticated, gameController.details);

router.get('/:id/update', gameController.update)
router.post('/:id/doUpdate', gameController.doUpdate)

router.post('/:id/add', gameController.add)
router.post('/:id/wish', gameController.wish)
router.post('/:id/change', gameController.change)
router.post('/:id/removeOwned', gameController.removeOwned)
router.post('/:id/removeWish', gameController.removeWish)
router.post('/:id/removeChange', gameController.removeChange)

module.exports = router;