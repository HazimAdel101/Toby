module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resource: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Role, {
            through: 'RolePermission',
            foreignKey: 'permissionId'
        });
    };

    return Permission;
};
