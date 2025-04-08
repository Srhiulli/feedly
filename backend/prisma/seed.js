import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const user1Email = `alice${Date.now()}@feedly.io`;
  const user2Email = `bob${Date.now()}@feedly.io`;

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
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });