const express = require('express');
const { exchangeController } = require('../controllers')
const { authenticator } = require('../middleware');
const router = express.Router();

router.post('/', authenticator.authenticate, exchangeController.exchangeRequest);
router.get('/', authenticator.authenticate, exchangeController.get);
router.put('/:requestId', authenticator.authenticate, exchangeController.updateStatus)

module.exports = router;
