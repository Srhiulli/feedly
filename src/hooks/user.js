import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/login';
import { GET_USER } from '../graphql/queries/getUser';
import { CREATE_USER } from '../graphql/mutations/createUser';

export const useAuth = () => {
  const [loginUser, { data: loginData, error: loginError }] = useMutation(LOGIN_USER);
  const [getUserLazy, { data: userData, error: userError }] = useLazyQuery(GET_USER);
    const [createUser, { data: createUserData, error: createUserError }] = useMutation(CREATE_USER);


  const validateUser = async (email, password) => {
    try {
      const { data } = await loginUser({ 
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

  const getUserByEmail = async (email) => {
    try {
      const result = await getUserLazy({
        variables: { email }
      });
      return { user: result.data?.user };
    } catch (error) {
      return { error: error.message };
    }
  };

  const handleCreateUser = async (email, password) => { 
    console.log("creating", email);

    try {
      const {data} = await createUser({
        variables: { email, password }
      })
      if (!data) {
          return { user: data.createUser };
      }
      return { user: data}
    }
    catch (error) {
      return { error: error.message };
    }
  }

  return {
    validateUser,
    getUserByEmail,
    loginData,
    loginError,
    userData,
    userError,
    handleCreateUser,
    createUserData,
    createUserError
  };
};