import { gql } from "apollo-server";

export const baseTypes = gql`
  type User {
    id: ID!
    account: Account
    name: String!
    email: String!
  }

  type Account {
    id: ID!
    name: String
    country: String
  }
`;
