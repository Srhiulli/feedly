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
         console.error('Usuário não encontrado');
        }

        return user;

      } catch (error) {
        throw new Error(error.message || 'Erro ao buscar usuário');
      }
    },
    feedbackByUserId: async (_, { user_id }) => {
      try {
        const feedback = await prisma.feedback.findMany({
          where: { user_id },
          select: {
            id: true,
            title: true,
            message: true,
            stars: true,
            created_at: true,
            updated_at: true,
            deleted_at: true,
            is_public: true,
            status: true,
            category: true,
            response: true,
            tags: true,
            created_by: true,
            user_id: true,
            user: true,
          }
        });
        const validFeedback = feedback.filter((f) => f.id !== null);

        if (!validFeedback) {
          console.error('Feedback não encontrado');
        }
        return validFeedback;

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