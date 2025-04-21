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
    title: String
    message: String
    stars: Int
    created_at: String
    updated_at: String
    deleted_at: String
    is_public: Boolean
    status: String
    category: String
    response: String
    tags: [String]
    created_by: String
    user_id: ID!
    user: User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    userByEmail(email: String!): User
    userById(id: ID!): User
    feedbackByUserId(user_id: String!): [Feedback]
  }
    

  type Mutation {
    createUser(email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    createFeedback(
      title: String
      message: String!
      stars: Int
      is_public: Boolean
      status: String
      category: String
      response: String
      tags: [String]
      user_id: String!
      created_by: String!
    ): Feedback!
  }
`;