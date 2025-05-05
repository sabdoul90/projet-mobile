const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./usermodele');

const Classe = database.define(
    'Classe', 
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
        description:{
            type: DataTypes.STRING,
            allowNull : false,
        }
    },
    {
        tableName: "classes",
        timestamps: true,
    }
);

Classe.belongsToMany(User, {
  through: "userclasse",
  foreignKey: 'classeId',
  otherKey: 'userId',
  as: 'membres',
  onDelete: "CASCADE"
});

User.belongsToMany(Classe, {
  through: "userclasse",
  foreignKey: 'userId',     // Ici userId
  otherKey: 'classeId',
  as: 'classes',
  onDelete: "CASCADE"
});

module.exports = Classe;