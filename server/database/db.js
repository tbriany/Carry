const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/carry';
const db = pgp(connectString);

module.exports = db;