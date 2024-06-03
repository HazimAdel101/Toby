// models/collection.js
module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define('Collection', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
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
            as: 'user'
        });
        Collection.hasMany(models.Bookmark, {
            foreignKey: 'collectionId',
            as: 'bookmarks'
        });
        Collection.belongsToMany(models.Tag, {
            through: 'CollectionTags',
            as: 'tags',
            foreignKey: 'collectionId',
            otherKey: 'tagId'
        });
    };

    return Collection;
};
