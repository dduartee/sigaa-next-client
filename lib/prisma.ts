import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prismaInstance: PrismaClient }

export const prismaInstance =
  globalForPrisma.prismaInstance ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaInstance = prismaInstance
