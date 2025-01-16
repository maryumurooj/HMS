// routes/ward.js
const express = require('express');
const router = express.Router();
const WardController = require('../controllers/WardController');

router.post('/', WardController.createWard);
router.get('/', WardController.getWards);
router.put('/:id', WardController.updateWard);
router.delete('/:id', WardController.deleteWard);

module.exports = router;
