"use client"

import { useEffect, useRef, useState } from "react"
import { CameraSetup } from "@/components/camera-setup"
import { ResponseDisplay } from "@/components/response-display"
import { WelcomeSection } from "@/components/welcome-section"
import { VoiceWave } from "@/components/voice-wave"
import { API_BASE_URL } from "@/lib/config"

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const listeningRef = useRef(false)
  const responseHistoryRef = useRef<Array<{
    command?: string
    action?: string
    emotion?: string
    direction?: string
    objects?: string[]
    timestamp: Date
  }>>([])

  const handleCameraConnected = () => {
    setCameraConnected(true)
  }

  const fetchAssistantResponse = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${API_BASE_URL}/assistant/listen`)
      if (!res.ok) throw new Error("Failed to get response from assistant")
      const data = await res.json()

      const newResponse = {
        command: data.command || "Bharat heard you.",
        action: data.action,
        emotion: data.emotion,
        direction: data.direction,
        objects: data.objects,
      }

      setResponse(newResponse)
      
      // Add to response history with timestamp
      if (data.command) {
        responseHistoryRef.current = [
          ...responseHistoryRef.current,
          { ...newResponse, timestamp: new Date() }
        ].slice(-5) // Keep last 5 responses
      }
    } catch (error) {
      console.error("Assistant error:", error)
      setError("Connection failed. Please check if the server is running.")
    } finally {
      setLoading(false)
    }
  }

  const startListening = () => {
    setListening(true)
    listeningRef.current = true

    const assistantLoop = async () => {
      if (!listeningRef.current) return
      await fetchAssistantResponse()
      if (listeningRef.current) {
        setTimeout(assistantLoop, 10000)
      }
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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white p-4 max-w-xl mx-auto">
      <div className="flex-grow space-y-8">
        <WelcomeSection />

        {!cameraConnected ? (
          <CameraSetup onCameraConnected={handleCameraConnected} />
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={listening ? stopListening : startListening}
                className={`px-6 py-3 rounded-md text-white text-lg font-medium transition-all shadow-md ${
                  listening ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                } hover:shadow-lg`}
                aria-label={listening ? "Stop Assistant" : "Start Bharat Assistant"}
              >
                {listening ? "🛑 Stop Assistant" : "🎙️ Start Bharat Assistant"}
              </button>

              {listening && (
                <div className="mt-4 flex flex-col items-center">
                  <VoiceWave active={listening} />
                  <p className="text-center text-sm text-gray-300 mt-2">
                    {loading ? "Processing..." : "Listening for commands…"}
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-900 border border-red-700 text-white px-4 py-2 rounded mt-2">
                  {error}
                </div>
              )}

              <div className="w-full max-w-md">
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Try saying:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="bg-gray-700 px-3 py-1.5 rounded border border-gray-600">
                      <strong>"Bharat detect"</strong> - Identify objects around you
                    </li>
                    <li className="bg-gray-700 px-3 py-1.5 rounded border border-gray-600">
                      <strong>"Bharat search Taj Mahal"</strong> - Search for information
                    </li>
                    <li className="bg-gray-700 px-3 py-1.5 rounded border border-gray-600">
                      <strong>"Bharat play Lata Mangeshkar"</strong> - Play music or videos
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {response && <ResponseDisplay response={response} />}
            
            {responseHistoryRef.current.length > 0 && (
              <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium mb-2 text-white">Recent Commands</h3>
                <ul className="space-y-1 text-sm">
                  {responseHistoryRef.current.map((resp, idx) => (
                    <li key={idx} className="p-2 bg-gray-700 rounded border border-gray-600">
                      <span className="font-medium text-white">{resp.command}</span>
                      <span className="text-xs text-gray-300 ml-2">
                        {resp.timestamp.toLocaleTimeString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      
      <footer className="mt-8 pt-4 border-t border-gray-700 text-center">
        <div className="text-sm text-gray-300">
          <p>Made with <span className="text-red-400">❤️</span> by <strong>Lakshya Betala</strong></p>
          <p className="text-xs mt-1">Version 1.0.2 | Last updated: May 2025</p>
        </div>
      </footer>
    </div>
  )
}