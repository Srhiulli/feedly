import prisma from '../../lib/prismaClient.js';
import { UserInputError } from 'apollo-server';
import { loginUser } from '../../modules/auth/login.js';


export const resolvers = {
  Query: {
    user: async (_, { email }) => {
      try {
        const user = await prisma.user.findUnique({ 
          where: { email },
          select: {  
            id: true,
            email: true,
            name: true,
            phone: true
          }
        });
        if (!user) {
          throw new UserInputError('Usuário não encontrado', {
            extensions: { code: 'USER_NOT_FOUND' }
          });
        }

        return user; 

      } catch (error) {
        throw new Error(error.message || 'Erro ao buscar usuário');
      }
    }
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      if (!email) {
        throw new UserInputError('Email é obrigatório');
      }

      if (!password || password.trim().length < 2) {
        throw new UserInputError('Nome deve ter pelo menos 2 caracteres');
      }

      try {
        return await prisma.user.create({
          data: {
            email,
            password: password.trim(),
          }
        });
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro interno ao cadastrar usuário');
      }
    },
    login: async (_, { email, password }) => {
      return await loginUser(email, password);
    },
  }
};