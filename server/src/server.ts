import fastify from 'fastify'
import { memoriesRoute } from './routes/memories'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(memoriesRoute)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server')
  })
