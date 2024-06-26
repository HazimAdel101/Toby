module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define('Collection', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty"
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });

    Collection.associate = (models) => {
        Collection.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });
        Collection.hasMany(models.Bookmark, {
            foreignKey: 'collectionId',
            as: 'bookmarks',
            onDelete: 'CASCADE'
        });
        Collection.belongsToMany(models.Tag, {
            through: 'CollectionTags',
            as: 'tags',
            foreignKey: 'collectionId',
            otherKey: 'tagId',
        });
        Collection.belongsTo(models.Workspace, {
            foreignKey: 'workspaceId',
            as: 'workspace'
        });

    };

    return Collection;
};