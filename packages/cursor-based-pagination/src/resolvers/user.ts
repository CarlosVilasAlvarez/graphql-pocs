import { Maybe } from "graphql/jsutils/Maybe.js";
import { QueryResolvers, User, UsersConnection } from "../types/resolvers-types.js";

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
      const { first, after: cursor, filters } = args;

      const edges = users
        .filter(filterUserByAccount(filters?.account))
        .filter(filterUserByCursor(cursor))
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

function filterUserByAccount(account: Maybe<string>) {
  return (user: User) => {
    if (account) {
      return user.account.id === account;
    }

    return true;
  };
}

function filterUserByCursor(cursor: Maybe<string>) {
  return (user: User & { createdAt: string }) => {
    if (cursor) {
      const createdAtCursor = new Date(Buffer.from(cursor, "base64").toString("utf8"));
      return user.createdAt > createdAtCursor.toISOString();
    }

    return true;
  };
}
