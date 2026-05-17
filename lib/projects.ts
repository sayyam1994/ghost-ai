import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export interface ProjectWithOwnership {
  id: string
  name: string
  ownerId: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  owned: boolean
}

export async function getProjectsForUser(): Promise<{
  owned: ProjectWithOwnership[]
  shared: ProjectWithOwnership[]
}> {
  const { userId } = await auth()
  if (!userId) return { owned: [], shared: [] }

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress

  const [ownedProjects, sharedCollabs] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' }
    }),
    email
      ? prisma.projectCollaborator.findMany({
          where: { email },
          include: { project: true },
          orderBy: { createdAt: 'desc' }
        })
      : []
  ])

  const owned: ProjectWithOwnership[] = ownedProjects.map((p) => ({
    ...p,
    owned: true
  }))

  const shared: ProjectWithOwnership[] = sharedCollabs.map((c) => ({
    ...c.project,
    owned: false
  }))

  return { owned, shared }
}
