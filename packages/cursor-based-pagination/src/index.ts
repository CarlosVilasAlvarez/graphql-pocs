import { ApolloServer } from "apollo-server";
import { baseTypes } from "./schema/baseTypes.js";
import { queries } from "./schema/queries.js";
import { userResolver } from "./resolvers/user.js";

const server = new ApolloServer({
  typeDefs: [baseTypes, queries],
  resolvers: [userResolver],
  csrfPrevention: true,
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
