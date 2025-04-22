import { gql } from '@apollo/client';

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback(
    $title: String!
    $message: String!
    $stars: Int!
    $is_public: Boolean!
    $status: String!
    $category: String!
    $response: String
    $tags: [String!]!
    $user_id: String!
    $created_by: String!
  ) {
    createFeedback(
      title: $title
      message: $message
      stars: $stars
      is_public: $is_public
      status: $status
      category: $category
      response: $response
      tags: $tags
      user_id: $user_id
      created_by: $created_by
    ) {
      id
      title
      message
      stars
      is_public
      status
      category
      response
      tags
      created_at
    }
  }
`;