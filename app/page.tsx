import { Suspense } from "react"
import BharatAssistant from "@/components/bharat-assistant"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="sr-only">Bharat – AI Assistant for the Visually Impaired</h1>
          <ModeToggle />
        </header>

        <Suspense fallback={<div className="h-20 flex items-center justify-center">Loading...</div>}>
          <BharatAssistant />
        </Suspense>
      </div>
    </main>
  )
}
