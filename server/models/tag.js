module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isHexColor(value) {
                    if (!/#[0-9A-Fa-f]{6}/.test(value)) {
                        throw new Error('Invalid color format. Must be # followed by 6 hex characters (0-9, A-F).');
                    }
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Collection, {
            through: 'CollectionTags',
            as: 'collections',
            foreignKey: 'tagId',
            otherKey: 'collectionId',
            // onDelete: 'SET NULL'
        });

        Tag.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Tag;
};
