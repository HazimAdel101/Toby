const { WorkspaceUser } = require('../models');

const checkRole = async (req, res, next) => {
    const workspaceId = req.body.workspaceId; 
    const userId = req.user.id;

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
        res.status(500).json({ message: 'Error checking authorization' });
    }
};

module.exports = checkRole;
