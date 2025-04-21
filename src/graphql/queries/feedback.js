import { gql } from '@apollo/client';

export const GET_FEEDBACK_BY_USER_ID = gql`
  query GetFeedbackByUserId($user_id: String!) {
    feedbackByUserId(user_id: $user_id) {
      id
      title
      message
      stars
      created_at
      updated_at
      deleted_at
      is_public
      status
      category
      response
      tags
      created_by
      user_id
    }
  }
`;