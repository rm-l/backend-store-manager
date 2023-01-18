const express = require('express');

const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', productController.register);

router.put('/:id', productController.update);

module.exports = router;