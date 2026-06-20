const express = require('express');
const router = express.Router();
const {addUser, getUsers, updateUser, deleteUser} = require('../controllers/User');

router.post('/add', addUser);
router.get('/get', getUsers);
router.get('/get/:id', getUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;