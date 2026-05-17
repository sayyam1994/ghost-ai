'use client'

import { useState } from 'react'

export interface MockProject {
  id: string
  name: string
  slug: string
  owned: boolean
}

type DialogType = 'create' | 'rename' | 'delete' | null

const MOCK_PROJECTS: MockProject[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    owned: true
  },
  { id: '2', name: 'Auth Service', slug: 'auth-service', owned: true },
  { id: '3', name: 'Data Pipeline', slug: 'data-pipeline', owned: false }
]

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function useProjectDialogs() {
  const [openDialog, setOpenDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(
    null
  )
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<MockProject[]>(MOCK_PROJECTS)

  const slug = toSlug(projectName)

  function openCreate() {
    setProjectName('')
    setOpenDialog('create')
  }

  function openRename(project: MockProject) {
    setProjectName(project.name)
    setSelectedProject(project)
    setOpenDialog('rename')
  }

  function openDelete(project: MockProject) {
    setSelectedProject(project)
    setOpenDialog('delete')
  }

  function closeDialog() {
    setOpenDialog(null)
    setSelectedProject(null)
    setProjectName('')
    setIsLoading(false)
  }

  function handleCreate() {
    if (!projectName.trim() || !slug) return
    const newProject: MockProject = {
      id: String(Date.now()),
      name: projectName.trim(),
      slug,
      owned: true
    }
    setProjects((prev) => [...prev, newProject])
    closeDialog()
  }

  function handleRename() {
    if (!projectName.trim() || !slug || !selectedProject) return
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, name: projectName.trim(), slug }
          : p
      )
    )
    closeDialog()
  }

  function handleDelete() {
    if (!selectedProject) return
    setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id))
    closeDialog()
  }

  return {
    openDialog,
    selectedProject,
    projectName,
    setProjectName,
    isLoading,
    projects,
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
