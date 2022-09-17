import { composeResolvers } from "@graphql-tools/resolvers-composition"
import { db } from "../../database/database"

const userResolver = {
    User: {
        role: async (parent: any, args: any, context: any, info: any) => {
            return await db('Roles').where('id', '=', parent.role).first()
        }
    },
    Query: {
        users: async (parent, args, context, info) => {
            return db.select().from('Users');
        }
    },
    Mutation: {
        signUp: async (parent, args, context, info) => {
            const { email, username, password, role } = args;
            try {
                await db('Users').insert({ email, username, password, role });
            } catch (e) {
                throw new Error(e);
            }
            return "User created successfully";
        }
    }
}

const userResolversComposition = {
}

export const userComposedResolvers = composeResolvers(userResolver, userResolversComposition)