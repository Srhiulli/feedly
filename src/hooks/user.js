import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

export const useUserValidation = () => {
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only' 
  });

const validateUser = async (email) => {
  try {
    const result = await getUser({ variables: { email } });
    console.log("GraphQL Response:", result); 
    return result.data?.getUser || null;
  } catch (err) {
    console.error("Full Error:", JSON.stringify(err, null, 2)); 
    return null;
  }
};

  return { 
    validateUser,
    loading,
    error,
    user: data?.getUser 
  };
};