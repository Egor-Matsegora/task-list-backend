const express = require('express');
const controller = require('../controllers/note.controller');
const router = express.Router();

router.get('/', controller.getUserNotes);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
