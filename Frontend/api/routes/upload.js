const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'images/',
    filename: (req, file, cb) => {
      console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html');
});

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
  return res.json({ message: 'Upload success' });
});


module.exports = router;