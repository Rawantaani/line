const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config()
const app = express();
const port = process.env.PORT;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully.');
});

app.get('/download', (req, res) => {
  const fileName = 'lineBalancing.rar';  // Replace with the actual rar file name
  const filePath = path.join(__dirname, 'upload', fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName);
  } else {
    res.status(404).send('File not found.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
