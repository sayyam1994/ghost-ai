'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ProjectWithOwnership } from '@/lib/projects'

type DialogType = 'create' | 'rename' | 'delete' | null

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function shortSuffix(): string {
  return Math.random().toString(36).slice(2, 7)
}

export function useProjectActions(activeProjectId?: string) {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOwnership | null>(null)
  const [projectName, setProjectName] = useState('')
  const [suffix, setSuffix] = useState(() => shortSuffix())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const slug = projectName.trim() ? `${toSlug(projectName)}-${suffix}` : ''

  function openCreate() {
    setProjectName('')
    setSuffix(shortSuffix())
    setOpenDialog('create')
  }

  function openRename(project: ProjectWithOwnership) {
    setProjectName(project.name)
    setSelectedProject(project)
    setOpenDialog('rename')
  }

  function openDelete(project: ProjectWithOwnership) {
    setSelectedProject(project)
    setOpenDialog('delete')
  }

  function closeDialog() {
    setOpenDialog(null)
    setSelectedProject(null)
    setProjectName('')
    setIsLoading(false)
    setError(null)
  }

  async function handleCreate() {
    if (!projectName.trim() || !slug) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: projectName.trim() })
      })
      if (!res.ok) throw new Error('Failed to create project')
      const project = (await res.json()) as { id: string }
      closeDialog()
      router.push(`/editor/${project.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
      setIsLoading(false)
    }
  }

  async function handleRename() {
    if (!projectName.trim() || !selectedProject) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: projectName.trim() })
      })
      if (!res.ok) throw new Error('Failed to rename project')
      closeDialog()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rename project')
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!selectedProject) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete project')
      closeDialog()
      if (activeProjectId === selectedProject.id) {
        router.push('/editor')
      } else {
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project')
      setIsLoading(false)
    }
  }

  return {
    openDialog,
    selectedProject,
    projectName,
    setProjectName,
    isLoading,
    error,
    slug,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete
  }
}
