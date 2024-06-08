const { Router } = require('express');
const WorkspaceController = require('../controllers/workspaceController');
const { isAuth } = require('../middleware/auth')
const  checkRole  = require('../middleware/checkRole')

const router = Router();

router.post('/create', isAuth, WorkspaceController.createWorkspace);
router.post('/create/collection', isAuth, checkRole, WorkspaceController.createWorkspaceCollection);
router.post('/update', isAuth, WorkspaceController.editWorkspace);
router.post('/delete', isAuth, checkRole, WorkspaceController.delete);
router.post('/create/collaborator', isAuth, checkRole, WorkspaceController.addUserToWorkspace);

module.exports = router;