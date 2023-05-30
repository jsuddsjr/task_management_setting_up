'use strict';

const Sequelize = require('sequelize');

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {number} role
*/

/**
 * Create User model.
 * @param {Sequelize} sequelize A connected DB
 * @returns {Sequelize.Model<User>}
 */
module.exports = (sequelize, DataTypes = Sequelize.DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        role: DataTypes.INTEGER
    }, {
        sequelize
    });
    return User;
};