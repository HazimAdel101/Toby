const { WorkspaceUser } = require('../models');

const checkRole = async (req, res, next) => {
    const workspaceId = req.body.workspaceId;
    console.log(`workspce id : ${workspaceId}`);
    const userId = req.user.id;
    console.log(`userId id : ${userId}`);

    if (!workspaceId) {
        return res.status(400).json({ message: 'Missing workspaceId in request body' });
    }

    try {
        const workspaceUser = await WorkspaceUser.findOne({
            where: { userId, workspaceId }
        });

        if (!workspaceUser || workspaceUser.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to perform this action' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error (server error)' });
    }
};

module.exports = checkRole;
