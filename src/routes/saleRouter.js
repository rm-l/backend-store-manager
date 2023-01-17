const express = require('express');

const { saleController } = require('../controllers');

const router = express.Router();

router.post('/', saleController.register);

 router.get('/sales', saleController.getAll);

 router.get('/sales/:id', saleController.getById);

module.exports = router;