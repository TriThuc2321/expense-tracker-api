const { Router } = require('express');
const { getByUserId, addWorkspace } = require('./controller');

const router = Router();

router.get('/userId/:userId', getByUserId);

router.post('/', addWorkspace);

module.exports = router;
