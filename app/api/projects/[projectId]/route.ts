import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ projectId: string }> }

async function getOwnedProject(userId: string, projectId: string) {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) return null
  if (project.ownerId !== userId) return 'forbidden' as const
  return project
}

export async function PATCH(request: Request, { params }: Params) {
  const { userId } = await auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { projectId } = await params
  const result = await getOwnedProject(userId, projectId)

  if (result === null)
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  if (result === 'forbidden')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json().catch(() => ({}))
  const name: string = body.name?.trim() || 'Untitled Project'

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: { name }
  })

  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  const { userId } = await auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { projectId } = await params
  const result = await getOwnedProject(userId, projectId)

  if (result === null)
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  if (result === 'forbidden')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.project.delete({ where: { id: projectId } })

  return new NextResponse(null, { status: 204 })
}
