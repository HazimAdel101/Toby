'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkspaceUser extends Model {
        static associate(models) {
            // Define associations here
            WorkspaceUser.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            WorkspaceUser.belongsTo(models.Workspace, {
                foreignKey: 'workspaceId',
                as: 'workspace'
            });
        }
    }

    WorkspaceUser.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        workspaceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Workspaces',
                key: 'id'
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'admin'
        }
    }, {
        sequelize,
        modelName: 'WorkspaceUser',
    });

    return WorkspaceUser;
};
