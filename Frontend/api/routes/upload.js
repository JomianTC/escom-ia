const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'images/',
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html');
});

router.put('/update/profile-picture', upload.single('file'), (req, res) => {
  return res.json({ message: 'Upload success' });
});


module.exports = router;