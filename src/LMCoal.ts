import fastify from 'fastify'
import userRoutes from '@LMCoal/modules/user/user.route'
import prisma from '@LMCoal/utils/prisma'
import { userSchemas } from './modules/user/user.schema'

export default class LMCoal {
  constructor() {
    console.log('Colecting coal...')
  }

  ignite() {
    const server = fastify()

    const { ADDRESS = 'localhost', PORT = 3000 } = process.env

    for (const schema of userSchemas) {
      server.addSchema(schema)
    }

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
          console.log(`Ignited at ${address}`)
        })
        .catch(() => {
          console.error('Failed to connect to database')
          process.exit(1)
        })
    })
  }
}
