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

  type Feedback {
    id: ID!
    message: String!
    deleted_at: String
    created_at: String
    user_id: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    userByEmail(email: String!): User
    userById(id: ID!): User
    feedbackByUserId(user_id: String!): Feedback
  }
    

  type Mutation {
    createUser(email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;