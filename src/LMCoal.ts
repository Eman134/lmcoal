import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import userRoutes from './modules/user/user.route'
const prisma = new PrismaClient()

export default class LMCoal {
  constructor() {
    console.log('Colecting coal...')
  }

  ignite() {
    const server = fastify()

    const { ADDRESS = 'localhost', PORT = 3000 } = process.env

    server.get('/', async (_request, _reply) => {
      return { hello: 'world' }
    })

    server.get('/healthcheck', async (_request, _reply) => {
      return { status: 'OK' }
    })

    server.register(userRoutes, { prefix: 'api/users' })

    server.listen({ host: ADDRESS, port: Number(PORT) }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      prisma
        .$connect()
        .then(() => {
          console.log('Connected to database')
        })
        .catch(() => {
          console.error('Failed to connect to database')
          process.exit(1)
        })
      console.log(`Ignited at ${address}`)
    })
  }
}
