import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/login';

export const useAuth = () => {
  const [getUser, { data, error }] = useMutation(LOGIN_USER);

  const validateUser = async (email, password) => {
    try {
      const { data } = await getUser({ 
        variables: { email, password } 
      });
      if (!data?.login.user) {
        return { error: "User not found" };
      }
      return { user: data.login.user };
      
    } catch (error) {
      return { error: error.message };
    }
  };

  return { validateUser, userData: data, error };
};