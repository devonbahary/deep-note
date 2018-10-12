const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('./config/config');

const folders = require('./routes/api/folders');
const notes = require('./routes/api/notes');

const app = express();

// body-parser middleware
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

// use routes
app.use('/api/folders', folders);
app.use('/api/notes', notes);

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/public/'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port:${port}`));

module.exports = { app };
