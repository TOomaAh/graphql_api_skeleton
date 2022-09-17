var { graphql, buildSchema } = require('graphql');
const express = require('express');
const cors = require('cors');
import { graphqlHTTP } from 'express-graphql'
import { executableSchema } from './graphql/resolver.graphql';
const compress = require('compression');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
    '/graphql',
    graphqlHTTP((req, res, graphQLParams) => ({
        schema: executableSchema,
        graphiql: true,
    }))
);

app.get('/', (request, response) => {
    response.send('Hello, GraphQL!')
});

  app.listen(port, () => {
    console.log(`Running a server at http://localhost:${port}`)
});