import { useState } from "react"

export function WelcomeSection() {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  
  return (
    <section className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Bharat</h1>
        <h2 className="text-xl md:text-2xl font-medium text-white">AI Assistant for the Visually Impaired</h2>
      </div>

      <p className="text-lg text-white">
        Bharat is an intelligent voice assistant that helps users detect nearby objects, analyze emotions, search the
        web, and play YouTube — all through voice.
      </p>

      <div className="flex justify-center">
        <button 
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          className="text-blue-300 hover:text-blue-100 flex items-center gap-1 text-sm font-medium"
        >
          {showMoreInfo ? "Hide details" : "Learn more about features"} 
          <span>{showMoreInfo ? "▲" : "▼"}</span>
        </button>
      </div>

      {showMoreInfo && (
        <div className="bg-gray-800 p-4 rounded-lg text-left border border-gray-700">
          <h3 className="font-semibold text-lg mb-3 text-white">Key Features:</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-300 mt-0.5">✓</span>
              <span><strong>Object Detection:</strong> Identifies objects in the surroundings using computer vision</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-300 mt-0.5">✓</span>
              <span><strong>Emotion Recognition:</strong> Analyzes facial emotions of people in view</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-300 mt-0.5">✓</span>
              <span><strong>Web Search:</strong> Searches the internet for information on command</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-300 mt-0.5">✓</span>
              <span><strong>Media Player:</strong> Plays music, videos, and other content from YouTube</span>
            </li>
          </ul>
        </div>
      )}

      <div className="bg-gray-800 p-4 rounded-lg text-left border border-gray-700">
        <h3 className="font-semibold text-lg mb-2 text-white">Step-by-step instructions:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-200">
          <li>Ensure the mobile device is connected to the same Wi-Fi as the computer.</li>
          <li>
            Open the <strong className="text-blue-300">IP Webcam</strong> app on your phone and start the camera.
          </li>
          <li>
            Copy the IP address shown in the app (e.g., <code className="bg-gray-900 px-2 py-0.5 rounded text-sm">192.168.1.4</code>)
            and paste it below.
          </li>
        </ol>
      </div>
    </section>
  )
}