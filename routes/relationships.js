const express = require('express');
const router = express.Router();
const relationshipsController = require('../app/api/controllers/relationships');
const validateJWT = require('../app/api/auth');

router.get('/', /*validateJWT,*/ relationshipsController.getAll);
router.post('/', /*validateJWT,*/ relationshipsController.create);
router.get('/:user_id', /*validateJWT,*/ relationshipsController.getFriendsById);
router.post('/updateUser', /*validateJWT,*/ relationshipsController.updateById);
router.delete('/:user_id', /*validateJWT,*/ relationshipsController.deleteById);

module.exports = router;