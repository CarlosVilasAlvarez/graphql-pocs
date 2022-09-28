import { ApolloServer } from "apollo-server";
import { errorTypes } from "./schema/errors.js";
import { mutations } from "./schema/mutations.js";
import { queries } from "./schema/queries.js";
import { baseTypes } from "./schema/baseTypes.js";
import { userResolvers } from "./resolvers/user.js";

const server = new ApolloServer({
  typeDefs: [baseTypes, queries, mutations, errorTypes],
  resolvers: [userResolvers],
  csrfPrevention: true,
  cache: "bounded",
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
