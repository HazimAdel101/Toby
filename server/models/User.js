'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
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
      }
    },
    githubId: {
      type: DataTypes.STRING,
      // unique: true
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
        
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.associate = (models) => {
    User.hasMany(models.Collection, {
        foreignKey: 'userId',
        as: 'collections'
    });
};

  return User;
};
