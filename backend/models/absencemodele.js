const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./usermodele');
const Cours = require('./coursmodele');

const Absence = database.define('Absence', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  raison: {
    type: DataTypes.STRING,
    allowNull: true
  },
  eleveId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // ou User.tableName
      key: 'id'
    }
  },
  coursId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cours',
      key: 'id'
    }
  }
}, {
  tableName: 'absences',
  timestamps: true
});

Absence.belongsTo(User, 
    { as: 'eleve', foreignKey: 'eleveId' });
Absence.belongsTo(
    Cours, { foreignKey: 'coursId' });

module.exports = Absence;