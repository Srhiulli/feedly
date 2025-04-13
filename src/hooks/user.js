import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/login';

export const useAuth = () => {
  const [getUser, { data, error }] = useMutation(LOGIN_USER);

  const validateUser = async (email, password) => {

    try {
      const { data } = await getUser({ 
        variables: { email, password } 
      });

      
      if (!data?.user) {
        return { error: "User not found" };
      }
      
      return { user: data.user };
      
    } catch (error) {
      console.error("Login failed:", error);
      return { error: error.message };
    }
  };

  return { validateUser, userData: data, error };
};