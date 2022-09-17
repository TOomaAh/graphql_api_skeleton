require('dotenv').config();

module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: `${__dirname}/dev.sqlite3`
      },
      useNullAsDefault: true
    },
    staging: {
      client: 'postgresql',
      connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PASS
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
    production: {
      client: 'postgresql',
      connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PASS
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };