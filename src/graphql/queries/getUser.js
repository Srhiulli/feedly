import { gql } from '@apollo/client';



export const GET_USER_BY_EMAIL = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      name
      email
      phone
    }
  }
`;



export const GET_USER_BY_ID = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

