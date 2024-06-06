'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Collection, {
        foreignKey: 'userId',
        as: 'collections'
      });
      User.hasMany(models.Tag, {
        foreignKey: 'userId',
        as: 'tags'
      });
      User.belongsToMany(models.Workspace, {
        through: 'WorkspaceUser',
        foreignKey: 'userId',
        otherKey: 'workspaceId',
        as: 'workspaces'
      });
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name cannot be null.'
        },
        notEmpty: {
          msg: 'First name cannot be empty.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name cannot be null.'
        },
        notEmpty: {
          msg: 'Last name cannot be empty.'
        }
      }
    },
    githubId: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty.'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
