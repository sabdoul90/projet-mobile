const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbconfiguration = new Sequelize( 
    process.env.DB_NAME, 
    process.env.USER_NAME,
    process.env.PWD, {
        host: process.env.HOST_NAME,
        dialect: process.env.dialect,
});

module.exports = dbconfiguration;