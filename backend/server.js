const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: path.join(__dirname, '.env'),
})

const app = require('./app');
const { PORT, DATABASE_CONNECTION_STRING } = require('./configs');

mongoose.connect(DATABASE_CONNECTION_STRING).then(() => {
  console.log('Database Conected :)');
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
});
