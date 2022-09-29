import { gql } from "apollo-server";

export const queries = gql`
  type Query {
    user(email: ID!): UserResult!
  }

  union UserResult = User | UserNotFoundError
`;
