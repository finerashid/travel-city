const express = require('express');
const router = express.Router();
const {addUser, getUsers, updateUser, deleteUser} = require('../controllers/User');
const { authenticate } = require("../middlewares/authMiddleware");

router.post('/add', authenticate,  addUser);
router.get('/get', authenticate,  getUsers);
router.get('/get/:id', authenticate,  getUsers);
router.put('/update/:id', authenticate,  updateUser);
router.delete('/delete/:id', authenticate,  deleteUser);

module.exports = router;