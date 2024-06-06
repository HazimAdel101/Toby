'use strict';

module.exports = (sequelize, DataTypes) => {
    const Workspace = sequelize.define('Workspace', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Workspace.associate = (models) => {
        Workspace.belongsToMany(models.User, {
            through: 'WorkspaceUser',
            foreignKey: 'workspaceId',
            otherKey: 'userId',
            as: 'users'
        });
        Workspace.hasMany(models.Collection, {
            foreignKey: 'workspaceId',
            as: 'collections'
        });
    };

    return Workspace;
};
