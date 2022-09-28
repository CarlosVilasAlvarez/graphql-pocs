import { gql } from "apollo-server";

export const mutations = gql`
  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResult!
  }

  input CreateUserInput {
    name: String
    email: ID!
  }

  union CreateUserResult = User | DuplicatedUserError
`;
