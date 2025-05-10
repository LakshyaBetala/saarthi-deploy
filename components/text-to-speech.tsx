"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Volume2, Loader2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/config"

export default function TextToSpeech() {
  const [text, setText] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  const handleSpeak = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to speak",
        variant: "destructive",
      })
      return
    }

    setIsSpeaking(true)

    try {
      const formData = new FormData()
      formData.append("text", text)

      const response = await fetch(`${API_BASE_URL}/speak`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to generate speech")
      }

      // Assuming the backend returns audio data
      const blob = await response.blob()
      const audioUrl = URL.createObjectURL(blob)

      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
      }

      toast({
        title: "Text to Speech",
        description: "Speaking the text now",
      })
    } catch (error) {
      console.error("Error generating speech:", error)
      toast({
        title: "Error",
        description: "Failed to generate speech. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSpeaking(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Text to Speech</CardTitle>
        <CardDescription>Enter text to be spoken aloud.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSpeak} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="speak-text" className="text-lg font-medium sr-only">
              Text to Speak
            </label>
            <Textarea
              id="speak-text"
              placeholder="Enter text to be spoken"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px] text-lg"
              aria-label="Text to speak"
            />
          </div>
          <Button type="submit" className="w-full h-14 text-lg font-semibold" disabled={isSpeaking}>
            {isSpeaking ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Speaking...
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-5 w-5" />
                Speak Text
              </>
            )}
          </Button>
        </form>

        <audio ref={audioRef} className="hidden" controls />

        <p className="mt-4 text-sm text-muted-foreground">
          Instructions: Type the text you want Saarthi to speak, then press the Speak Text button.
        </p>
      </CardContent>
    </Card>
  )
}
