/**
 * Models
 * @module Models
 *
 * @typedef {import('./user').User} User
 * @typedef {import('./user').UserRole} UserRole
 * @typedef {Sequelize.Model<User>} UserModel
 * @typedef {Sequelize.Model<UserRoleModel>} UserRoleModel
 *
 * @typedef {Object} DB
 * @property {Sequelize.ModelStatic<UserModel>} DB.User
 * @property {Sequelize.ModelStatic<UserRoleModel>} DB.UserRole
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

/** @type {DB} */
const db = {};

const sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
