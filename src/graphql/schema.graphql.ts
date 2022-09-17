export const typeDefs = /* GraphQL */ `

    type User {
        id: Int!
        email: String!
        username: String!
        password: String!
        role: Role!
    }

    type Role {
        id: Int!
        name: String!
        is_admin: Int!
    }

    type Query {
        users: [User]!
    }

    type Mutation {
        signUp(email: String!, username: String!, password: String!, role: Int!): String!
        login(email: String!, password: String!): String!

        addRole(name: String!, is_admin: Int!): Role!
    }
`;