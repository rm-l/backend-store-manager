const express = require('express');

const { saleMiddleware } = require('../middlewares/saleMiddleware');

const { saleController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.getAll);

router.get('/:id', saleController.getById);

router.post('/', saleMiddleware, saleController.register);

module.exports = router;