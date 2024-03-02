import { server } from './app'
import { z } from 'zod'
import { prisma } from './lib/prisma'

server.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  return res.status(200).json(users)
})

server.post('/users', async (req, res) => {
  const validateSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = validateSchema.parse(req.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return res.status(201).send()
})
