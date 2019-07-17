const express = require('express');
const router = express.Router();
const poke_listController = require('../app/api/controllers/poke_list');
const validateJWT = require('../app/api/auth');

router.get('/', /*validateJWT,*/ poke_listController.getAll);
router.post('/', /*validateJWT,*/ poke_listController.create);
router.get('/:user_id', /*validateJWT,*/ poke_listController.getPokeListById);

module.exports = router;