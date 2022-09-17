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
        description: String!
        created_at: String!
        updated_at: String
    }

    type Query {
        users: [User]!
        roles: [Role]!
    }

    type Mutation {
        signUp(email: String!, username: String!, password: String!, role: Int!): String!
        signIn(email: String!, password: String!): String!

        addRole(name: String!, description: String!, is_admin: Int!): Role!
        updateRole(id: Int!, name: String!, description: String!, is_admin: Int!): Role!
        deleteRole(id: Int!): ID
    }
`;