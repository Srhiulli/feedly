import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/login';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from '../graphql/queries/getUser';
import { CREATE_USER} from '../graphql/mutations/createUser';

export const useAuth = () => {
  const [loginUser, { data: loginData, error: loginError }] = useMutation(LOGIN_USER);
  const [getUserLazy, { data: userData, error: userError }] = useLazyQuery(GET_USER_BY_EMAIL);
  const [createUser, { data: createUserData, error: createUserError }] = useMutation(CREATE_USER);
  const [getUserByIdLazy, { data: userByIdData, error: userByIdError }] = useLazyQuery(GET_USER_BY_ID);


  const getUser = async (email, password) => {
  try {
    const { data } = await loginUser({ 
      variables: { email, password } 
    });
    if (!data?.login.user || !data?.login.token) {
      return { error: "User not found" };
    }
    return { user: data.login.user, token: data.login.token }; 
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

  const getUserById = async (id) => {
    try {
      const result = await getUserByIdLazy({
        variables: { id }
      });
      return { user: result.data?.userById };
    } catch (error) {
      return { error: error.message };
    }
  };

  const handleCreateUser = async (email, password) => { 
    try {
      const {data} = await createUser({
        variables: { email, password }
      })
      if (!data?.createUser) {
      return { error: 'Erro inesperado' };
      }
    return { user: data.createUser };
    }
    catch (error) {
      return { error: error };
    }
  }

  return {
    getUser,
    getUserByEmail,
    loginData,
    loginError,
    userData,
    userError,
    handleCreateUser,
    createUserData,
    createUserError,
    getUserById,
    userByIdData,
    userByIdError
  };
};