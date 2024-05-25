import prisma from '@LMCoal/utils/prisma'
import { CreateUserInput } from './user.schema'
import { hashPassword } from '@LMCoal/utils/hash'

export async function createUser(userInput: CreateUserInput) {
  const password = await hashPassword(userInput.password)

  const user = await prisma.user.create({
    data: { ...userInput, password },
  })

  return user
}
