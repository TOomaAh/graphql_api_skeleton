import { makeExecutableSchema } from "@graphql-tools/schema";
import { roleComposedResolvers } from "./resolvers/role.resolvers";
import { userComposedResolvers } from "./resolvers/user.resolvers";
import { typeDefs } from "./schema.graphql";

export const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers: [
        userComposedResolvers,
        roleComposedResolvers
    ],
});