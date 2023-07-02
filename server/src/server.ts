import 'dotenv/config'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { memoriesRoute } from './routes/memories'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes)
app.register(memoriesRoute)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server')
  })
