const express = require('express');
const router = express.Router();
const {ajouterCours, modifierCours, getCoursParClasse} = require('../controllers/cours');

// Ajouter un cours
router.post('/', ajouterCours);

// Modifier un cours
router.put('/:id', modifierCours);

// Obtenir les cours d'une classe
router.get('/classe/:classeId', getCoursParClasse);

module.exports = router;