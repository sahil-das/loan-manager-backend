const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addEntry, getSummary, editEntry, deleteEntry } = require('../controllers/borrowController');

router.use(auth);
router.post('/', addEntry);
router.get('/', getSummary);
router.put('/:id', editEntry);
router.delete('/:id', deleteEntry);

module.exports = router;