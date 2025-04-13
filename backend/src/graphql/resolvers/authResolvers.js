import { loginUser } from '../../modules/auth/login.js';

export const authResolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      return await loginUser(email, password);
    },
  },
};