'use strict';
const app = require('./app');
const db = require('../db');

app.listen(process.env.PORT || 3000, () => {
  console.log(`NSA listening on port`, process.env.PORT);
});
