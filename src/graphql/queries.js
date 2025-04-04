import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      name
    }
  }
`;