import 'dotenv/config'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { memoriesRoute } from './routes/memories'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)
app.register(cors, {
  origin: true,
})
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoute)
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP Server')
  })
