const express = require('express');
const router = express.Router();
const cardController = require('../app/api/controllers/cards');
//const validateJWT = require('../app/api/auth');

router.get('/', cardController.getAll);
router.post('/', cardController.create);
router.get('/addItem/:cardId', cardController.addItem);
router.post('/renameCard', cardController.renameCard);
router.post('/renameCardItem', cardController.renameCardItem);
router.post('/updateRibbon', cardController.updateRibbon);
router.post('/deleteCardItem', cardController.deleteCardItem);
router.post('/updateIndex', cardController.updateIndex);
router.get('/deleteCard/:cardId', cardController.deleteById);

module.exports = router;