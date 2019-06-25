const express = require('express');
const router = express.Router();
const movieController = require('../app/api/controllers/movies');
const validateJWT = require('../app/api/auth');

router.get('/', validateJWT, movieController.getAll);
router.post('/', validateJWT, movieController.create);
router.get('/:movieId', validateJWT, movieController.getById);
router.put('/:movieId', validateJWT, movieController.updateById);
router.delete('/:movieId', validateJWT, movieController.deleteById);

module.exports = router;