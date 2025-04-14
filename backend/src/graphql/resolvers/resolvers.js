import prisma from '../../lib/prismaClient.js';
import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';

export const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new Error('User not found');
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');


      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      };
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