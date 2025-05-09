"use client"

import { useEffect, useRef, useState } from "react"
import { CameraSetup } from "@/components/camera-setup"
import { ResponseDisplay } from "@/components/response-display"
import { WelcomeSection } from "@/components/welcome-section"
import { VoiceWave } from "@/components/voice-wave"

export default function BharatAssistant() {
  const [cameraConnected, setCameraConnected] = useState(false)
  const [listening, setListening] = useState(false)
  const [response, setResponse] = useState<{
    command?: string
    action?: string
    emotion?: string
    direction?: string
    objects?: string[]
  } | null>(null)

  const listeningRef = useRef(false)

  const handleCameraConnected = () => {
    setCameraConnected(true)
  }

  const fetchAssistantResponse = async () => {
    try {
      const res = await fetch("http://localhost:8000/assistant/listen")
      if (!res.ok) throw new Error("Failed to get response from assistant")
      const data = await res.json()

      setResponse({
        command: data.command || "Bharat heard you.",
        action: data.action,
        emotion: data.emotion,
        direction: data.direction,
        objects: data.objects,
      })
    } catch (error) {
      console.error("Assistant error:", error)
    }
  }

  const startListening = () => {
    setListening(true)
    listeningRef.current = true

    const assistantLoop = async () => {
      if (!listeningRef.current) return
      await fetchAssistantResponse()
      setTimeout(assistantLoop, 10000)
    }

    assistantLoop()
  }

  const stopListening = () => {
    setListening(false)
    listeningRef.current = false
  }

  useEffect(() => {
    return () => {
      listeningRef.current = false
    }
  }, [])

  return (
    <div className="space-y-8 p-4 max-w-xl mx-auto">
      <WelcomeSection />

      {!cameraConnected ? (
        <CameraSetup onCameraConnected={handleCameraConnected} />
      ) : (
        <>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={listening ? stopListening : startListening}
              className={`px-6 py-3 rounded-md text-white text-lg transition ${
                listening ? "bg-red-600" : "bg-green-600"
              } hover:opacity-90`}
            >
              {listening ? "🛑 Stop Assistant" : "🎙️ Start Bharat Assistant"}
            </button>

            {listening && (
              <div className="mt-4">
                <VoiceWave active={listening} />
                <p className="text-center text-sm text-gray-500 mt-2">
                  Listening for commands…
                </p>
              </div>
            )}

            <p className="text-sm text-gray-500 text-center">
              Say <strong>“Bharat detect”</strong>, <strong>“Bharat search Taj Mahal”</strong>,{" "}
              <strong>“Bharat play Lata Mangeshkar”</strong>...
            </p>
          </div>

          {response && <ResponseDisplay response={response} />}
        </>
      )}
    </div>
  )
}
