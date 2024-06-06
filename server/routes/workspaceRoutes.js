const { Router } = require('express');
const WorkspaceController = require('../controllers/workspaceController');
const { isAuth } = require('../middleware/auth')

const router = Router();

router.post('/create', isAuth, WorkspaceController.createWorkspace);
router.post('/create/collection', isAuth, WorkspaceController.createWorkspaceCollection);
router.post('/update', isAuth, WorkspaceController.editWorkspace);
router.post('/delete', isAuth, WorkspaceController.delete);

module.exports = router;
