import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ''

  if (url.startsWith('prisma+postgres://')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { withAccelerate } = require('@prisma/extension-accelerate')
    return new PrismaClient({ accelerateUrl: url }).$extends(
      withAccelerate()
    ) as unknown as PrismaClient
  }

  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

export const prisma: PrismaClient =
  process.env.NODE_ENV === 'production'
    ? createClient()
    : (global.__prisma ??= createClient())
