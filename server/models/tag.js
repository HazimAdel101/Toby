// models/tag.js
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Collection, {
            through: 'CollectionTags',
            as: 'collections',
            foreignKey: 'tagId',
            otherKey: 'collectionId'
        });
    };

    return Tag;
};
