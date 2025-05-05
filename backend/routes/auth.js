const express = require('express');
const { signup, signin, editerUSer, getUSer, getUSers } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/users/update/:id', editerUSer);
router.get('/users/:id', getUSer);
router.get('/users', getUSers);

module.exports = router; 