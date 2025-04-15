import { gql } from '@apollo/client';



export const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      name
      email
      phone
    }
  }
`;
