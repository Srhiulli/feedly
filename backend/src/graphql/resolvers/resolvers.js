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
    createUser: async (_, { email, name, phone }) => {
      if (!email) {
        throw new UserInputError('Email é obrigatório');
      }

      if (!name || name.trim().length < 2) {
        throw new UserInputError('Nome deve ter pelo menos 2 caracteres');
      }

      if (phone && !/^\d{10,11}$/.test(phone)) {
        throw new UserInputError('Telefone deve ter 10 ou 11 dígitos');
      }

      const existingUser = await prisma.user.findFirst({
        where: { email }
      });

      if (existingUser) {
        throw new UserInputError('Email já cadastrado', {
          extensions: {
            code: 'EMAIL_ALREADY_EXISTS'
          }
        });
      }

      try {
        return await prisma.user.create({
          data: {
            email,
            name: name.trim(),
            phone: phone ? phone.replace(/\D/g, '') : null
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