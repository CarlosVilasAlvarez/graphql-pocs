import { QueryResolvers, UserResolvers, UsersConnection } from "../types/resolvers-types.js";

const users = [
  {
    id: "2",
    name: "Carlos",
    account: {
      id: "1",
      name: "Account 1",
      country: "US",
    },
    email: "carlosvilas@carlosvilas.dev",
    createdAt: "2020-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    name: "John",
    account: {
      id: "1",
      name: "Account 1",
      country: "US",
    },
    email: "john@gmail.com",
    createdAt: "2020-01-02T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Jane",
    account: {
      id: "1",
      name: "Account 1",
      country: "US",
    },
    email: "jane@gmail.com",
    createdAt: "2020-01-03T00:00:00.000Z",
  },
];

export const userResolver: { Query: QueryResolvers } = {
  Query: {
    users: async (_, args): Promise<UsersConnection> => {
      const { first, after } = args;
      const cursor = after ? new Date(Buffer.from(after, "base64").toString("utf8")) : null;
      console.log(cursor);

      const edges = users
        .filter((user) => !cursor || user.createdAt < cursor.toISOString())
        .slice(0, first)
        .map((user) => ({
          cursor: Buffer.from(user.createdAt).toString("base64"),
          node: user,
        }));

      const hasNextPage = edges.length > 0 && edges.length === first;
      const startCursor = edges.length > 0 ? edges[0].cursor : null;
      const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          startCursor,
          endCursor,
        },
      };
    },
  },
};
