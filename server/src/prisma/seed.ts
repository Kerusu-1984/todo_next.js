import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const wash = await prisma.task.create({
    data: {
      text: "洗濯をする",
      completed: false
    }
  });

  const cook = await prisma.task.create({
    data: {
      text: "料理をする",
      completed: false
    }
  });
  console.log({ wash, cook });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });