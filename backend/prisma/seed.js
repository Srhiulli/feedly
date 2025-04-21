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
          title: "Produto excelente",
          message: "Adorei o produto, superou minhas expectativas!",
          stars: 5,
          is_public: true,
          status: "resolved",
          category: "elogio",
          tags: ["produto", "qualidade"],
          created_by: "admin",
          user_id: alice.id,
        },
        {
          title: "Atendimento ótimo",
          message: "O atendimento foi rápido e eficiente.",
          stars: 4,
          is_public: true,
          status: "resolved",
          category: "elogio",
          tags: ["suporte", "tempo"],
          created_by: "admin",
          user_id: bob.id,
        },
        ...Array.from({ length: 18 }).map((_, i) => ({
          title: `Feedback ${i + 1}`,
          message: `Mensagem de feedback número ${i + 1}`,
          stars: (i % 5) + 1,
          is_public: i % 2 === 0,
          status: i % 3 === 0 ? "pending" : "resolved",
          category: ["bug", "sugestão", "elogio"][i % 3],
          tags: ["UX", "UI"],
          created_by: "admin",
          user_id: i % 2 === 0 ? alice.id : bob.id,
        })),
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