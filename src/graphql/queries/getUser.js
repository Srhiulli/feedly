import { gql } from '@apollo/client';



export const GET_USER = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      id
      name
      email
      phone
      password 
      created_at
      deleted_at
    }
  }
`;
