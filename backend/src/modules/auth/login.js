import prisma from '../../lib/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  console.log("user",user);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const senhaCorreta = await bcrypt.compare(password, user.password);
  if (!senhaCorreta) {
    console.log("Senha incorreta",password, user.password);
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
}