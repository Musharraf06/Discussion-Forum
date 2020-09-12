
const mongoose = require('mongoose');
const assert = require('assert');

// connection 
const db_url = 'mongodb://localhost:27017/discuss'
const database = mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, link) => {
  // error checking
  assert.equal(err, null, 'Failed to connect to database');
  // Success
  console.log('Connected to database');
});

module.exports = database;