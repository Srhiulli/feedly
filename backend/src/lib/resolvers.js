import prisma from './prismaClient.js';
import { UserInputError } from 'apollo-server';

export const resolvers = {
  Query: {
    user: async (_, { email }) => {
      // Validação do formato do email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new UserInputError('Formato de email inválido');
      }

      const user = await prisma.user.findFirst({
        where: { email }
      });

      if (!user) {
        throw new UserInputError('Usuário não encontrado', {
          extensions: {
            code: 'USER_NOT_FOUND',
            email
          }
        });
      }

      return user;
    }
  },
  Mutation: {
    createUser: async (_, { email, name, phone }) => {
      // Validações dos campos
      if (!email) {
        throw new UserInputError('Email é obrigatório');
      }

      if (!name || name.trim().length < 2) {
        throw new UserInputError('Nome deve ter pelo menos 2 caracteres');
      }

      if (phone && !/^\d{10,11}$/.test(phone)) {
        throw new UserInputError('Telefone deve ter 10 ou 11 dígitos');
      }

      // Verifica se usuário já existe
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

      // Criação do usuário com tratamento de erro
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
    }
  }
};