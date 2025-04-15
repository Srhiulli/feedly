import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/login';
import { GET_USER } from '../graphql/queries/getUser';


export const useAuth = () => {
  const [getUser, { data, error }] = useMutation(LOGIN_USER);
    const [fetchUserByEmail, { data: userByEmailData, error: userByEmailError }] = useLazyQuery(GET_USER);


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

  const getUserByEmail = (email) => {
    fetchUserByEmail({ variables: { email } });
  };

   return {
    validateUser,
    getUserByEmail,
    userData: data,
    error,
    userByEmail: userByEmailData,
    userByEmailError
  };;
};