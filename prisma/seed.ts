import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  const vizblocks = await db.user.create({
    data: {
      name: 'admin',
      email: 'admin@vizblocks.com',
      username: 'admin',
      passwordHash: '',
    },
  })

  // await Promise.all(
  //   getJokes().map(joke => {
  //     return db.user.create({ data: joke })
  //   }),
  // )
}

seed()
