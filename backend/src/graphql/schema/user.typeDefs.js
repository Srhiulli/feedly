import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    phone: String
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user(email: String!): User
  }

  type Mutation {
    createUser(email: String!, name: String!, phone: String): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;