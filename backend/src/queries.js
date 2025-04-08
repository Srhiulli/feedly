import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    phone: String
    created_at: String
    updated_at: String
  }

type Query {
  user(email: String!): User
}

  type Mutation {
    createUser(
      email: String!
      name: String!
      phone: String
    ): User!
  }
`;