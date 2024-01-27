const express = require('express');
const { updateUser, deleteUser } = require('../controllers/user.controllers.js');
const verifyToken = require('../utils/verifyUser.js');

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;