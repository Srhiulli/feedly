import prisma from '../../lib/prismaClient.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const wrongPassword = await bcrypt.compare(password, user.password);
  if (wrongPassword === true) {
    throw new Error("Senha incorreta")
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );


  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
}