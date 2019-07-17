const express = require('express');
const router = express.Router();
const user_friendsController = require('../app/api/controllers/user_friends');
const validateJWT = require('../app/api/auth');

router.get('/', /*validateJWT,*/ user_friendsController.getAll);
router.post('/', /*validateJWT,*/ user_friendsController.create);
router.get('/:user_id', /*validateJWT,*/ user_friendsController.getFriendsById);
router.put('/:user_id', /*validateJWT,*/ user_friendsController.updateById);
router.delete('/:user_id', /*validateJWT,*/ user_friendsController.deleteById);

module.exports = router;