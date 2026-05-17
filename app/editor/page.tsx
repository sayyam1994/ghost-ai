'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { EditorNavbar } from '@/components/editor/editor-navbar'
import { ProjectSidebar } from '@/components/editor/project-sidebar'
import {
  CreateProjectDialog,
  RenameProjectDialog,
  DeleteProjectDialog
} from '@/components/editor/project-dialogs'
import { useProjectDialogs } from '@/hooks/use-project-dialogs'
import { Button } from '@/components/ui/button'

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
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
  } = useProjectDialogs()

  return (
    <div className="flex h-screen flex-col bg-bg-base">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projects={projects}
        onNewProject={openCreate}
        onRenameProject={openRename}
        onDeleteProject={openDelete}
      />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 pt-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-text-primary">
            Create a project or open an existing one
          </h1>
          <p className="text-sm text-text-muted">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gap-2 bg-accent-primary text-bg-base hover:bg-accent-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </main>

      <CreateProjectDialog
        open={openDialog === 'create'}
        onClose={closeDialog}
        projectName={projectName}
        onProjectNameChange={setProjectName}
        slug={slug}
        isLoading={isLoading}
        onConfirm={handleCreate}
      />
      <RenameProjectDialog
        open={openDialog === 'rename'}
        onClose={closeDialog}
        project={selectedProject}
        projectName={projectName}
        onProjectNameChange={setProjectName}
        slug={slug}
        isLoading={isLoading}
        onConfirm={handleRename}
      />
      <DeleteProjectDialog
        open={openDialog === 'delete'}
        onClose={closeDialog}
        project={selectedProject}
        isLoading={isLoading}
        onConfirm={handleDelete}
      />
    </div>
  )
}
