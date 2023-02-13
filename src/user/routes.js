const { Router } = require('express');
const { getAll, getByEmail, addUser, checkEmailExisted } = require('./controller');

const router = Router();

router.get('/', getAll);
router.get('/emailExisted/:email', checkEmailExisted);
router.get('/:email', getByEmail);

router.post('/', addUser);

module.exports = router;
