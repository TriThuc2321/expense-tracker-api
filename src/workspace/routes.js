const { Router } = require('express');
const {
    getListWpByUserEmail,
    getListEmailsByWorkspaceId,
    getDetail,
    addWorkspace,
    addWorkspaceDetail,
    deleteWorkspace,
    updateWorkspace,
} = require('./controller');

const router = Router();

router.get('/list/email/:email', getListWpByUserEmail);
router.get('/list/id/:workspaceId', getListEmailsByWorkspaceId);
router.get('/detail/:workspaceId', getDetail);

router.post('/', addWorkspace);
router.post('/detail', addWorkspaceDetail);

router.put('/', updateWorkspace);

router.delete('/:workspaceId', deleteWorkspace);

module.exports = router;
