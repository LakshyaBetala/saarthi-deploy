export function WelcomeSection() {
  return (
    <section className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Bharat</h1>
        <h2 className="text-xl md:text-2xl font-medium">AI Assistant for the Visually Impaired</h2>
      </div>

      <p className="text-lg">
        Bharat is an intelligent voice assistant that helps users detect nearby objects, analyze emotions, search the
        web, and play YouTube — all through voice.
      </p>

      <div className="bg-muted p-4 rounded-lg text-left">
        <h3 className="font-semibold text-lg mb-2">Step-by-step instructions:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Ensure the mobile device is connected to the same Wi-Fi as the computer.</li>
          <li>
            Open the <strong>IP Webcam</strong> app on your phone and start the camera.
          </li>
          <li>
            Copy the IP address shown in the app (e.g., <code className="bg-background px-1 rounded">192.168.1.4</code>)
            and paste it below.
          </li>
        </ol>
      </div>

      <footer className="text-sm text-gray-500 mt-8">
        Made with <span className="text-red-500">❤️</span> by <strong>Lakshya Betala</strong>
      </footer>
    </section>
  )
}
