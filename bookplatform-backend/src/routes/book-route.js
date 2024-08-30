const express = require('express');
const { bookController } = require('../controllers');
const { authenticator } = require('../middleware');
const router = express.Router();

router.post('/', authenticator.authenticate, bookController.create);
router.put('/:book', authenticator.authenticate, bookController.update); 
router.delete('/:book', authenticator.authenticate, bookController.deleteOne); 
router.get('/book', authenticator.authenticate, bookController.get); 
router.get('/', authenticator.authenticate,bookController.getAll); 
router.get('/search', authenticator.authenticate, bookController.search);

module.exports = router;
