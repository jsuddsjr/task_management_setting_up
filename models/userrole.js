'use strict';

const Sequelize = require('sequelize');

/**
 * @typedef {Object} UserRole
 * @property {number} UserRole.id
 * @property {string} UserRole.role
 */

/**
 * Create UserRole model.
 * @param {Sequelize} sequelize A connected DB
 * @returns {Sequelize.Model<UserRole>}
 */
module.exports = (sequelize, DataTypes = Sequelize.DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        role: DataTypes.STRING
    }, {
        sequelize
    });
    return UserRole;
};