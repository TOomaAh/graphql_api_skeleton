# GraphQL api skeleton

This project is a skeleton for a GraphQL api with jwt authentication.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Database

In development mode, the database is a sqlite database. In production mode, the database is a postgres database.

### Migration

```bash
# generate migration (folder in src/database/migrations)
$ npm run init_migration
# run migration
$ npm run migrate
```

## Library used

### express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### knex

Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.

### GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

### jsonwebtoken

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).



