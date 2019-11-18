const express = require('express');
const router = express.Router();
const controller = require('./user.ctrl');

router.get('/', controller.find);
router.get('/:id', controller.findById);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
