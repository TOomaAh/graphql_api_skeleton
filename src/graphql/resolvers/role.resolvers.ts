import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { isAuthenticated } from "../../authentication/authorities.authentication";
import db from "../../database/database";
import { DatabaseError } from "../../error/database.error";



const roleResolver = {
    Query: {
        roles: async () => {
            try {
                return await db('roles').select('*');
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        }
    },
    Mutation: {
        addRole: async (_: any, args) => {
            const { name, description, is_admin } = args;
            try {
                const id = await db('roles').insert({ name: name,
                    description: description,
                    is_admin : is_admin,
                    created_at: new Date()
                });
                return await db('Roles').where('id', '=', id).first();
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        },
        updateRole: async (_: any, args) => {
            const { id, name, description, is_admin } = args;
            try {
                await db('roles').where('id', '=', id).update({ name: name,
                    description: description,
                    is_admin : is_admin,
                    updated_at: new Date()
                });
                return await db('Roles').where('id', '=', id).first();
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        },
        deleteRole: async (_: any, args) => {
            const { id } = args;
            try {
                await db('roles').where('id', '=', id).del();
                return id;
            } catch (e) {
                throw new Error(DatabaseError[e.errno].message);
            }
        }
    }

};

const roleResolverComposition = {
    'Query.*': [isAuthenticated()],
    'Mutation.*': [isAuthenticated()]
}

export const roleComposedResolvers = composeResolvers(roleResolver, roleResolverComposition)
