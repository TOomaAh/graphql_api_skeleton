import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { db } from "../../database/database";

const roleResolver = {
    Mutation: {
        addRole: async (_: any, args) => {
            const { name, is_admin } = args;
            try {
                await db('Roles').insert({ name, is_admin });
                console.log(await db('Roles').where({ name }).select('*'));
            } catch (e) {
                throw new Error(e);
            }
        }
    }

};

const roleResolverComposition = {

}

export const roleComposedResolvers = composeResolvers(roleResolver, roleResolverComposition)
