'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar
}: EditorNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-12 items-center border-b border-border-default bg-bg-surface px-3">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Center section */}
      <div className="flex flex-1 items-center justify-center" />

      {/* Right section */}
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </header>
  )
}
