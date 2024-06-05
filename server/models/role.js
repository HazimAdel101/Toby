module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last name cannot be null.'
                },
            },
            unique: true
        }
    });

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: 'UserRole',
            foreignKey: 'roleId'
        });
        Role.belongsToMany(models.Permission, {
            through: 'RolePermission',
            foreignKey: 'roleId'
        });
    };

    return Role;
};
