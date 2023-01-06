import { PrismaClient } from "@prisma/client";
declare let global: { prismaInstance: PrismaClient };

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prismaInstance: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaInstance = new PrismaClient()
} else {
  if (!global.prismaInstance) {
    global.prismaInstance = new PrismaClient()
  }
  prismaInstance = global.prismaInstance
}
export {prismaInstance}