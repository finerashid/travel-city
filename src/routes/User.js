const express = require('express');
const router = express.Router();
const {addUser, getUsers} = require('../controllers/User');

router.post('/add', addUser);
router.get('/get', getUsers);

module.exports = router;