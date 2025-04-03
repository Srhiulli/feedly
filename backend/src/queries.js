import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const user1Email = `alice${Date.now()}@feedly.io`;
  const user2Email = `bob${Date.now()}@feedly.io`;

  const user1 = await prisma.user.create({
    data: {
      email: user1Email,
      name: "Alice",
      phone: "123456789",
      deleted_at: new Date(),
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: user2Email,
      name: "Bob",
      phone: "123456789",
      deleted_at: new Date(),
    },
  });
  console.log(`Created users: ${user1.name} and ${user2.name} `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
