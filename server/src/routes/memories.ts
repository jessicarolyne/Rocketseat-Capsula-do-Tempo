import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { request } from 'http'
import { z } from 'zod'

export async function memoriesRoute(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        Id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)
    const memory = prisma.memory.create({
      data: {
        cover,
        coverUrl,
        isPublic,
      },
    })
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId,
      },
    })
    return memory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const memory = prisma.memory.delete({
      where: {
        id,
      },
    })
    return memory
  })
}
