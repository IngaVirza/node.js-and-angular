const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();

router.post('/:categoryId', controller.getByCategoryId);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.post('/:id', controller.remove);

module.exports = router;
