const express = require('express');
const controller = require('../controllers/task.controller');
const router = express.Router();

router.get('/:userId', controller.getUserTasks);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/id', controller.delete);

module.exports = router;
