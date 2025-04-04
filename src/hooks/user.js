// src/hooks/useUserValidation.js
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

export const useUserValidation = () => {
  const validateUser = async (email) => {
    try {
      const { data } = await useQuery(GET_USER, { variables: { email } });
      return data?.getUser || null;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  return { validateUser };
};