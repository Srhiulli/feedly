import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const now = Date.now();
  const user1Email = `alice${now}@feedly.io`;
  const user2Email = `bob${now}@feedly.io`;

  await prisma.user.createMany({
    data: [
      {
        email: user1Email,
        name: "Alice",
        phone: "123456789",
        password: "password123",
      },
      {
        email: user2Email,
        name: "Bob",
        phone: "987654321",
        password: "password123",
      }
    ],
    skipDuplicates: true,
  });

  const alice = await prisma.user.findUnique({ where: { email: user1Email } });
  const bob = await prisma.user.findUnique({ where: { email: user2Email } });

  if (alice && bob) {
    await prisma.feedback.createMany({
      data: [
        {
          message: "Adorei o produto, superou minhas expectativas!",
          user_id: alice.id,
        },
        {
          message: "O atendimento foi rápido e eficiente.",
          user_id: bob.id,
        }
      ],
      skipDuplicates: true,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });