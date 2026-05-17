import { SignUp } from '@clerk/nextjs'
import { Bot, Share2, FileText } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-bg-surface px-16 py-12">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-accent-primary shrink-0" />
          <span className="text-base font-semibold text-text-primary">
            Ghost AI
          </span>
        </div>

        {/* Main copy */}
        <div>
          <h1 className="text-4xl font-bold text-text-primary leading-tight mb-4">
            Design systems at the
            <br />
            speed of thought.
          </h1>
          <p className="text-sm text-text-secondary mb-10 max-w-sm">
            Describe your architecture in plain English. Ghost AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          {/* Feature list */}
          <ul className="space-y-6">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim">
                <Bot className="h-4 w-4 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  AI Architecture Generation
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Describe your system, AI maps it to nodes and edges on a live
                  canvas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim">
                <Share2 className="h-4 w-4 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Real-time Collaboration
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Live cursors, presence indicators, and shared node editing
                  across your team.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim">
                <FileText className="h-4 w-4 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Instant Spec Generation
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Export a complete Markdown technical spec directly from the
                  canvas graph.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="text-xs text-text-faint">
          © 2026 Ghost AI. All rights reserved.
        </p>
      </div>

      {/* Right panel — full width on small screens */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-bg-base p-8">
        <SignUp />
      </div>
    </div>
  )
}
