module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define('Bookmark', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Bookmark.associate = (models) => {
        Bookmark.belongsTo(models.Collection, {
            foreignKey: 'collectionId',
            as: 'collection'
        });
    };

    return Bookmark;
};
