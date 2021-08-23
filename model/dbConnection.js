const knex = require('knex');
const { selectDb } = require('../helpers/selectDb');

const db = knex(selectDb(process.env.DATABASE_URL));

module.exports = { db };