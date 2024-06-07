const { Workspace, User, Collection, Bookmark } = require('../models');

const WorkspaceController = {
    async createWorkspace(req, res) {
        try {
            const { name, description, userId } = req.body;

            const workspace = await Workspace.create({ name, description });
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).redirect('/toby');
            }

            await workspace.addUser(user);
            res.status(201).redirect('/toby');
        } catch (error) {
            console.error(error);
            res.status(500).redirect('/toby');
        }
    },

    async editWorkspace(req, res) {
        try {
            const { id, name, description } = req.body;
            console.error(`id ${id}, description ${description}, name ${name}`);
            const workspace = await Workspace.findByPk(id);
            if (!workspace) {
                return res.status(404).redirect('/toby');
            }

            workspace.name = name;
            workspace.description = description;

            await workspace.save();

            res.status(200).redirect('/toby');
        } catch (error) {
            console.error(error);
            res.status(500).redirect('/toby');
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.body;

            const collections = await Collection.findAll({ where: { workspaceId: id } });

            for (const collection of collections) {
                await Bookmark.destroy({ where: { collectionId: collection.id } });
            }
            await Collection.destroy({ where: { workspaceId: id } });
            await Workspace.destroy({ where: { id } });

            res.redirect('/toby');

        } catch (error) {
            res.redirect('/toby');
            console.error('Error deleting workspace:', error);
        }
    },
    async createWorkspaceCollection(req, res) {
        try {
            const { userId, workspaceId, name, description } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const workspace = await Workspace.findByPk(workspaceId);
            if (!workspace) {
                return res.status(404).json({ error: 'Workspace not found' });
            }

            const collection = await Collection.create({ name, userId, description, workspaceId });

            console.log(collection);

            res.status(201).redirect('/toby');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async addUserToWorkspace(req, res) {
        try {
            const { userId, workspaceId } = req.body;
            const role = 'user'
            const user = await User.findByPk(userId);
            const workspace = await Workspace.findByPk(workspaceId);

            if (user && workspace && role) {
                await workspace.addUser(user, { through: { role }});
                res.status(200).redirect('/toby');
            }
            else {
                res.status(404).redirect('/toby/jfjf');
            }
        }
        catch (error) {
            res.status(500).redirect('/toby');
        }
    },
};

module.exports = WorkspaceController;