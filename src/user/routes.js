const { Router } = require('express');
const { getAll, getById, addUser } = require('./controller');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', addUser);

module.exports = router;
