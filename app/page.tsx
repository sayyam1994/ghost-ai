import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Ghost AI
      <p className="mt-5 text-2xl text-zinc-700 dark:text-zinc-300 text-center sm:text-left">
        An AI assistant that helps you with your tasks.
      </p>
      <Button className="mt-5">Get Started</Button>
    </div>
  )
}
