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
                isUrl: {
                    msg: 'Must be a valid URL',
                    args: true,                }
            }
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
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
