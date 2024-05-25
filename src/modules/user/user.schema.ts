import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  userName: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(3),
}

const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6),
})

const createUserResponseSchema = z.object({
  ...userCore,
  id: z.string(),
})

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
})

export type CreateUserInput = z.infer<typeof createUserSchema>
