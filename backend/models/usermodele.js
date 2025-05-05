const { DataTypes } = require('sequelize');
const database = require('../config/database');

const User = database.define(
    'User', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true,
        },
        nom:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        prenom:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        numero:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        type:{
            type : DataTypes.ENUM('eleve', 'professeur'),
            allowNull : false,
        },
        profile:{
            type: DataTypes.STRING,
            allowNull : true,
        },
        motdepasse : {
            type: DataTypes.STRING,
            allowNull : false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;