import { gql } from "apollo-server";

export const errorTypes = gql`
  interface BaseError {
    message: String!
  }

  type UserNotFoundError implements BaseError {
    message: String!
    user: String!
  }

  type DuplicatedUserError implements BaseError {
    message: String!
    duplicatedKey: String!
  }
`;
