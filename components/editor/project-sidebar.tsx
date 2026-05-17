'use client'

import { X, Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { MockProject } from '@/hooks/use-project-dialogs'

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: MockProject[]
  onNewProject: () => void
  onRenameProject: (project: MockProject) => void
  onDeleteProject: (project: MockProject) => void
}

function ProjectItem({
  project,
  onRename,
  onDelete
}: {
  project: MockProject
  onRename?: (project: MockProject) => void
  onDelete?: (project: MockProject) => void
}) {
  return (
    <div className="group flex items-center gap-1 rounded-xl px-2 py-1.5 hover:bg-bg-elevated cursor-pointer">
      <span className="flex-1 truncate text-sm text-text-secondary group-hover:text-text-primary transition-colors">
        {project.name}
      </span>
      {project.owned && onRename && onDelete && (
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation()
              onRename(project)
            }}
            className="text-text-muted hover:text-text-primary hover:bg-bg-subtle"
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(project)
            }}
            className="text-text-muted hover:text-state-error hover:bg-state-error/10"
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRenameProject,
  onDeleteProject
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.owned)
  const sharedProjects = projects.filter((p) => !p.owned)

  return (
    <>
      {/* Backdrop scrim */}
      {isOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 top-12 z-40 bg-bg-base/60"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed top-12 left-0 bottom-0 z-50 flex w-72 flex-col',
          'border-r border-border-default bg-bg-surface',
          'transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ].join(' ')}
        aria-label="Project sidebar"
      >
        {/* Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border-default px-4">
          <span className="text-sm font-semibold text-text-primary">
            Projects
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-text-muted hover:text-text-primary hover:bg-bg-elevated"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-1 flex-col overflow-hidden px-3 pt-3">
          <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1 text-xs">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1 text-xs">
                Shared
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="my-projects"
              className="flex flex-1 flex-col overflow-hidden mt-2"
            >
              {ownedProjects.length === 0 ? (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm text-text-faint">No projects yet</p>
                </div>
              ) : (
                <ScrollArea className="flex-1">
                  <div className="flex flex-col gap-0.5 pb-2">
                    {ownedProjects.map((project) => (
                      <ProjectItem
                        key={project.id}
                        project={project}
                        onRename={onRenameProject}
                        onDelete={onDeleteProject}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent
              value="shared"
              className="flex flex-1 flex-col overflow-hidden mt-2"
            >
              {sharedProjects.length === 0 ? (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm text-text-faint">No shared projects</p>
                </div>
              ) : (
                <ScrollArea className="flex-1">
                  <div className="flex flex-col gap-0.5 pb-2">
                    {sharedProjects.map((project) => (
                      <ProjectItem key={project.id} project={project} />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border-default p-3">
          <Button
            className="w-full gap-2 bg-accent-primary text-bg-base hover:bg-accent-primary/90"
            size="sm"
            onClick={onNewProject}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
