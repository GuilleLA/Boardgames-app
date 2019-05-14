var express         = require('express');
var router          = express.Router();
var usersController = require('../controllers/users.controller')
const secure        = require('../middlewares/secure.mid');


/* GET users listing. */
router.get('/', secure.isAuthenticated, usersController.list);

router.get('/:id', secure.isAuthenticated, usersController.profile)

router.get('/:id/settings', secure.isUser, usersController.settings)
router.post('/:id/settings', usersController.doSettings)

router.post('/:id/follow', usersController.follow)
router.post('/:id/block', usersController.block)
router.post('/:id/unfollow', usersController.unfollow)


module.exports = router;
