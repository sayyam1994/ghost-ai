'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ProjectWithOwnership } from '@/lib/projects'

// ---------------------------------------------------------------------------
// Create Project Dialog
// ---------------------------------------------------------------------------

interface CreateProjectDialogProps {
  open: boolean
  onClose: () => void
  projectName: string
  onProjectNameChange: (value: string) => void
  slug: string
  isLoading: boolean
  onConfirm: () => void
}

export function CreateProjectDialog({
  open,
  onClose,
  projectName,
  onProjectNameChange,
  slug,
  isLoading,
  onConfirm
}: CreateProjectDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Give your architecture workspace a name.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading && projectName.trim() && slug)
                onConfirm()
            }}
            autoFocus
          />
          <p className="min-h-4 text-xs text-text-muted">
            {slug ? (
              <>
                Slug:{' '}
                <span className="font-mono text-text-secondary">{slug}</span>
              </>
            ) : null}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!projectName.trim() || !slug || isLoading}
          >
            {isLoading ? 'Creating…' : 'Create project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Rename Project Dialog
// ---------------------------------------------------------------------------

interface RenameProjectDialogProps {
  open: boolean
  onClose: () => void
  project: ProjectWithOwnership | null
  projectName: string
  onProjectNameChange: (value: string) => void
  slug: string
  isLoading: boolean
  onConfirm: () => void
}

export function RenameProjectDialog({
  open,
  onClose,
  project,
  projectName,
  onProjectNameChange,
  slug,
  isLoading,
  onConfirm
}: RenameProjectDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          {project && (
            <DialogDescription>
              Renaming{' '}
              <span className="text-text-secondary">{project.name}</span>
            </DialogDescription>
          )}
        </DialogHeader>
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading && projectName.trim() && slug)
              onConfirm()
          }}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!projectName.trim() || !slug || isLoading}
          >
            {isLoading ? 'Renaming…' : 'Rename project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Delete Project Dialog
// ---------------------------------------------------------------------------

interface DeleteProjectDialogProps {
  open: boolean
  onClose: () => void
  project: ProjectWithOwnership | null
  isLoading: boolean
  onConfirm: () => void
}

export function DeleteProjectDialog({
  open,
  onClose,
  project,
  isLoading,
  onConfirm
}: DeleteProjectDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          {project && (
            <DialogDescription>
              This will permanently delete{' '}
              <span className="text-text-secondary">{project.name}</span>. This
              action cannot be undone.
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting…' : 'Delete project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
