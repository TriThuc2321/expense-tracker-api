const { Router } = require('express');
const { getByUserEmail, addWorkspace, addWorkspaceDetail } = require('./controller');

const router = Router();

router.get('/email/:email', getByUserEmail);

router.post('/', addWorkspace);
router.post('/detail', addWorkspaceDetail);

module.exports = router;
