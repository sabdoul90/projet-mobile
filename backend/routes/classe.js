const express = require('express');
const { addClasse, deleteClasse,editerClasse, finBydIDClasse, getAllClasses, finBydIdUser } = require('../controllers/classe');

const router = express.Router();

router.post('/add', addClasse);
router.delete('/delete:id', deleteClasse);
router.put('/update:id', editerClasse);
router.get('/:id', finBydIDClasse);
router.get('', getAllClasses);
router.get('/user/:id', finBydIdUser);

module.exports = router; 