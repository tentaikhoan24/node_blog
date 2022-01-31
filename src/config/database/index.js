const mongoose = require('mongoose');
require('dotenv').config();
const uriDB =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0nmff.mongodb.net/education?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uriDB);
    console.log('Connect database successfully!!!');
  } catch (error) {
    console.log('Failed to connect database!!!', error);
  }
}

module.exports = { connect };
