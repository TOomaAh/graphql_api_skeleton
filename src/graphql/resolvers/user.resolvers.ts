import { composeResolvers } from "@graphql-tools/resolvers-composition"
import { isAuthenticated } from "../../authentication/authorities.authentication";
import { comparePassword, generate, hashPassword } from "../../authentication/jwt.authentication";
import db from "../../database/database";
import { DatabaseError } from "../../error/database.error";
const jwt = require('jsonwebtoken');


const userResolver = {
    User: {
        role: async (parent: any) => {
            try {
                return await db('roles').where('id', '=', parent.role).first();
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        }
    },
    Query: {
        users: async () => {
            try {
                return await db('users').select('*');
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        },
        user: async (_: any, args: any) => {
            const { id } = args;
            try {
                return await db('users').where('id', '=', id).first();
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        }
    },
    Mutation: {
        signUp: async (_: any, args) => {
            const { email, username, password, role } = args;
            try {
                const id = await db('users').insert({ email: email,
                    username: username,
                    password: await hashPassword(password),
                    role: role,
                    created_at: new Date()
                });
                return await db('users').where('id', '=', id).first();
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        },
        signIn: async (_: any, args) => {
            const { email, password } = args;
            try {
                const user = await db('users').where('email', '=', email).first();
                if (await comparePassword(password, user.password)) {
                    return await generate(user.id, user.username, user.role);
                } else {
                    return new Error('Invalid credentials');
                }
            } catch (e) {
                console.log(e);
                throw new Error(DatabaseError[e.errno].message);
            }
        },
        updateUser: async (_: any, args) => {
            const { id, email, username, password, role } = args;
            try {
                await db('users').where('id', '=', id).update({ email: email,
                    username: username,
                    password: await hashPassword(password),
                    role: role,
                    updated_at: new Date()
                });
                return await db('users').where('id', '=', id).first();
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        }
    }
}

const userResolversComposition = {
    'Query.*': [isAuthenticated()]
}

export const userComposedResolvers = composeResolvers(userResolver, userResolversComposition)