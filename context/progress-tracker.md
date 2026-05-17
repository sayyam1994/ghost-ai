# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Complete

## Current Goal

- Feature 04 (TBD)

## Completed

- `01-design-system.md` — shadcn/ui initialised (Tailwind v4), Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea added, lucide-react installed, `lib/utils.ts` with `cn()` created, `globals.css` updated to dark-only theme with project custom tokens.

- `02-editor.md` — `EditorNavbar` and `ProjectSidebar` shell components created in `components/editor/`; navbar has sidebar toggle with `PanelLeftOpen`/`PanelLeftClose` icons; sidebar floats above content, slides in from left, has My Projects / Shared tabs and a New Project button.

- `03-auth.md` — `ClerkProvider` wraps root layout with `dark` theme from `@clerk/ui/themes` and CSS variable overrides; `proxy.ts` at project root with protected-first middleware (public: `/sign-in`, `/sign-up`); sign-in/sign-up pages with two-panel layout (left: logo + feature list, right: Clerk form, mobile: form only); `/` redirects to `/editor` if authenticated, `/sign-in` otherwise; `/editor` route created with existing editor shell; `UserButton` added to editor navbar right section; `@clerk/ui` installed; sign-in/sign-up URL env vars added.

- `04-project-dialogs.md` — editor home screen (heading + description + New Project button); `useProjectDialogs` hook managing dialog/form/loading state with mock data; Create/Rename/Delete project dialogs with slug preview, auto-focus, and Enter-to-submit; sidebar project items with hover rename/delete actions (owned only); backdrop scrim; sidebar footer and home button wired to Create dialog.

## In Progress

- None.

## Next Up

- Feature 05 (TBD)

## Open Questions

- None yet.

## Architecture Decisions

- None yet.

## Session Notes

- Next.js 16.2.6 with React 19, Tailwind v4 (`@import 'tailwindcss'` in globals.css, no tailwind.config.js).
- Dark-only theme; all colors are CSS custom properties mapped via `@theme inline` in globals.css.
