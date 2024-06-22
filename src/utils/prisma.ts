import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
const prisma = new PrismaClient()
  .$extends(withAccelerate())
  .$extends(withOptimize())
export default prisma
