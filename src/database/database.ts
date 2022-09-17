const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile')[environment];

export const db = require('knex')(config);



