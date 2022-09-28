import { gql } from "apollo-server";

export const baseTypes = gql`
  type User {
    email: ID!
    name: String!
  }
`;
