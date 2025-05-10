"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mic, Loader2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/config"

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false)
  const [command, setCommand] = useState("")
  const [response, setResponse] = useState("")
  const { toast } = useToast()

  const handleVoiceCommand = async () => {
    setIsListening(true)
    setCommand("")
    setResponse("")

    try {
      const response = await fetch(`${API_BASE_URL}/voice_command`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to process voice command")
      }

      const data = await response.json()
      setCommand(data.command || "No command detected")
      setResponse(data.response || "No response available")

      toast({
        title: "Voice Command Processed",
        description: "Your voice command has been processed successfully.",
      })
    } catch (error) {
      console.error("Error processing voice command:", error)
      toast({
        title: "Error",
        description: "Failed to process voice command. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsListening(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Voice Command</CardTitle>
        <CardDescription>Press the microphone button and speak your command.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleVoiceCommand}
          className="w-full h-20 text-xl font-semibold"
          disabled={isListening}
          aria-label="Activate voice command"
        >
          {isListening ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Listening...
            </>
          ) : (
            <>
              <Mic className="mr-3 h-6 w-6" />
              Speak Command
            </>
          )}
        </Button>

        {(command || response) && (
          <div className="mt-6 space-y-4">
            {command && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Your Command:</h3>
                <p className="text-lg">{command}</p>
              </div>
            )}

            {response && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Saarthi's Response:</h3>
                <p className="text-lg">{response}</p>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Instructions: Press the button, wait for the beep, then speak your command clearly.
        </p>
      </CardContent>
    </Card>
  )
}
