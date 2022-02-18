import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data:{
      id:1,
      email:"kanikani@todo.com",
      name:"かに太郎",
      password:"kanikani"
      
    }
  })

  const wash = await prisma.task.create({
    data: {
      text: "洗濯をする",
      completed: false,
      user_id:1
    }
  });

  const cook = await prisma.task.create({
    data: {
      text: "料理をする",
      completed: false,
      user_id:1
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