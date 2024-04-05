const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:8080',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const content = require('./routes/content');
app.use('/content', content);

app.listen(52273, function() {
  console.log('Server Running at http://127.0.0.1:52273');
});