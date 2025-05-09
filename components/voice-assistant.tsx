"use client"

import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"
import { VoiceWave } from "@/components/voice-wave"

interface VoiceAssistantProps {
  isListening: boolean
  onStartListening: () => void
}

export function VoiceAssistant({ isListening, onStartListening }: VoiceAssistantProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <Button
        onClick={onStartListening}
        disabled={isListening}
        className={`
          w-full max-w-xs h-24 rounded-full text-xl font-semibold
          transition-all duration-300 ease-in-out
          ${isListening ? "bg-primary/80 shadow-lg scale-105" : "bg-primary hover:scale-105"}
        `}
        aria-label="Start Bharat Assistant"
      >
        {isListening ? (
          <div className="flex items-center">
            <VoiceWave />
            <span className="ml-3">Listening...</span>
          </div>
        ) : (
          <>
            <Mic className="mr-2 h-8 w-8" />
            <span>🎤 Start Bharat Assistant</span>
          </>
        )}
      </Button>

      {isListening && (
        <p className="text-center text-lg text-muted-foreground">
          Listening for voice commands like <br />
          <span className="font-medium">"Bharat detect"</span>,<span className="font-medium">"Bharat play [song]"</span>
          ,<span className="font-medium">"Bharat search [query]"</span>...
        </p>
      )}
    </div>
  )
}
