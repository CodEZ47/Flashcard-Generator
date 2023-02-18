const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

connection.connect();

// Handle the file upload and insert the file information into the database
app.post('/upload', upload.single('file'), (req, res) => {
  const allowedExtensions = ['doc', 'docx'];
  const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).send('Error: Only .doc and .docx files are allowed.');
  }

  const fileInfo = {
    name: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  };
  
  connection.query('INSERT INTO files SET ?', fileInfo, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error: Unable to save file information.');
    }
    
    res.send('File uploaded successfully.');
  });
});