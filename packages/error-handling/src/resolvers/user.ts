import { QueryResolvers } from "../types/resolvers-types.js";

const users = [
  {
    name: "Carlos",
    email: "carlosvilas@carlosvilas.dev",
  },
];

export const userResolvers: { Query: QueryResolvers } = {
  Query: {
    user: (_, { email }) => {
      const user = users.find((user) => user.email === email);

      if (!user) {
        return {
          __typename: "UserNotFoundError",
          message: "User not found",
          user: `${email}`,
        };
      }

      return {
        __typename: "UserPayload",
        data: {
          __typename: "User",
          ...user,
        },
      };
    },
  },
};
