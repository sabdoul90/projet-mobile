const { DataTypes } = require('sequelize');
const dbconfiguration = require('../config/database');
const User = require('./usermodele');

const File = dbconfiguration.define(
    "File",
    {
        id :{
            type : DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true,
        },
        nom:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        url:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        type:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        user :{
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model:User,
                key : "id"
            }
        },
        size:{
            type : DataTypes.INTEGER,
            allowNull : true,
        }
    },
    {
        tableName: "files",
        timestamps: true,
    }
);

User.hasOne(File, {foreignKey:"user", onDelete : 'CASCADE'});
File.belongsTo(User, {foreignKey:"user", onDelete : 'CASCADE'});
module.exports = File;