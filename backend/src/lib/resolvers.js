import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const resolvers = {
  Query: {
    getUser: async (_, { id, email }) => {
      return prisma.user.findUnique({
        where: { OR: [{ id }, { email }] }
      });
    }
  }
};