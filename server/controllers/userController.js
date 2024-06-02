const db = require('../models/index.js');
const Passport = require('../config/passportSetup.js');

const { User } = db;

const UserController = {
    async createUser(profile) {
        try {
            let user = await User.findOne({ where: { githubId: profile.id } });

            if (!user) {
                // Split display name into first and last name or provide defaults
                const fullName = profile.displayName ? profile.displayName.split(' ') : ["First Name", "Last Name"];
                const firstName = fullName[0] || "First Name";
                const lastName = fullName[1] || "Last Name";

                // Provide a default email if not available
                const email = (profile.emails && profile.emails[0] && profile.emails[0].value) ? profile.emails[0].value : 'noemail@example.com';

                user = await User.create({
                    githubId: profile.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: '123456',  // Consider using a more secure method for password
                });
            }

            return user;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    },

    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUser = req.body;
            const [updated] = await User.update(updatedUser, {
                where: { id: userId }
            });
            if (updated) {
                res.json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateUserPartial(req, res) {
        try {
            const userId = req.params.id;
            const updatedUserFields = req.body;
            const user = await User.findByPk(userId);
            if (user) {
                await user.update(updatedUserFields);
                res.json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deleted = await User.destroy({
                where: { id: userId }
            });
            if (deleted) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = UserController;