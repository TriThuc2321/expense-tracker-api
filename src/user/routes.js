const { Router } = require('express');
const { getAll, getById, addUser, checkEmailExisted } = require('./controller');

const router = Router();

router.get('/', getAll);
router.get('/emailExisted/:email', checkEmailExisted);
router.get('/:id', getById);

router.post('/', addUser);

module.exports = router;
