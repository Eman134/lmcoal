import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerUserHandler(
  _request: FastifyRequest,
  _reply: FastifyReply,
) {
  return { message: 'Register route' }
}
