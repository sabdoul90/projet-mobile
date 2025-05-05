const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./usermodele');
const Classe = require('./classemodele');

const Cours = database.define('Cours', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fichier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  statut: {
    type: DataTypes.BOOLEAN,
    defaultValue : false
  },
  periode: {
    type : DataTypes.ENUM('semestre 1', 'semestre 2'),
  },
  professeurId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  classeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Classe,
      key: 'id'
    }
  }
}, {
  tableName: 'cours',
  timestamps: true
});

Cours.belongsTo(User, {
  as: 'professeur',
  foreignKey: 'professeurId'
});

Cours.belongsTo(Classe, {
  as: 'classe',
  foreignKey: 'classeId'
});

module.exports = Cours;