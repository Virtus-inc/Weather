const express = require('express');
const router = express.Router();
const { loginRequired } = require('../controllers/auth');
const { getUser, patchUser, deleteUser } = require('../controllers/user');

router.get('/users/:id', getUser);
router.patch('/users/:id', loginRequired, patchUser);
router.delete('/users/:id', loginRequired, deleteUser);

module.exports = router;