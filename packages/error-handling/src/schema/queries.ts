import { gql } from "apollo-server";

export const queries = gql`
  type Query {
    user(email: ID!): UserResult!
  }

  type UserPayload {
    data: User
  }

  union UserResult = UserPayload | UserNotFoundError
`;
