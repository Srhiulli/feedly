import prisma from '../../lib/prismaClient.js';
import { UserInputError } from 'apollo-server';
import { loginUser } from '../../modules/auth/login.js';


export const resolvers = {
  Query: {
    userByEmail: async (_, { email }) => {
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
    },
    userById: async (_, { id }) => { 
      try {
        const user = await prisma.user.findUnique({
          where: { id },
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
    },
    feedbackByUserId: async (_, { user_id }) => {
      try {
        const feedback = await prisma.feedback.findUnique({
          where: { user_id },
          select: {
            id: true,
            message: true,
            deleted_at: true,
            created_at: true
          }
        });
        if (!feedback) {
          throw new UserInputError('feedback not found', {
            extensions: { code: 'USER_NOT_FOUND' }
          });
        }

        return feedback;

      } catch (error) {
        throw new Error(error.message || 'Error to find feedback');
      }
    }
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
  if (!email) throw new UserInputError('Email é obrigatório');

  if (!password || password.trim().length < 2) {
    throw new UserInputError('Senha deve ter pelo menos 2 caracteres');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new UserInputError('Este email já está em uso');
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: password.trim(),
      },
    });

    return user;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Erro interno ao cadastrar usuário');
  }
},
    login: async (_, { email, password }) => {
      return await loginUser(email, password);
    },
  }
}