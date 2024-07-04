const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const { loginRequired } = require('../controllers/auth');
const { uploadFile, getFiles } = require('../controllers/file');

router.get('/files', loginRequired, getFiles);
router.post('/files', loginRequired, upload.single('file'), uploadFile);

module.exports = router;