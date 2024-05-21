import { FastifyInstance } from 'fastify'
import { registerUserHandler } from './user.controller'

async function userRoutes(server: FastifyInstance) {
  server.post('/register', registerUserHandler)
}

export default userRoutes
