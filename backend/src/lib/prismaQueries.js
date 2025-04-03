import prisma from './prismaClient.js';


export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser(data) {
  return await prisma.user.create({ data });
}

export async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function softDeleteUser(id) {
  return await prisma.user.update({
    where: { id },
    data: {
      deleted_at: new Date(), 
    },
  });
}