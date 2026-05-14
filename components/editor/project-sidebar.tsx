'use client'

import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
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
              className="flex flex-1 items-center justify-center"
            >
              <p className="text-sm text-text-faint">No projects yet</p>
            </TabsContent>

            <TabsContent
              value="shared"
              className="flex flex-1 items-center justify-center"
            >
              <p className="text-sm text-text-faint">No shared projects</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border-default p-3">
          <Button
            className="w-full gap-2 bg-accent-primary text-bg-base hover:bg-accent-primary/90"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
