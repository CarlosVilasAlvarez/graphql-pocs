import { gql } from "apollo-server";

export const queries = gql`
  type Query {
    users(first: Int!, after: String, filters: UsersFilters): UsersConnection!
  }

  input UsersFilters {
    account: String
  }

  type UsersConnection {
    edges: [UserEdge]
    pageInfo: PageInfo!
  }

  type UserEdge {
    cursor: String!
    node: User
  }

  type PageInfo {
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
  }
`;
