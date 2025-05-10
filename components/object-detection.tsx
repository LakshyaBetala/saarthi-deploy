"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Scan, Loader2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react"
import { API_BASE_URL } from "@/lib/config"

interface DetectedObject {
  name: string
  confidence: number
}

interface DetectionResult {
  objects: DetectedObject[]
  direction: string
}

export default function ObjectDetection() {
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const { toast } = useToast()

  const handleDetectObjects = async () => {
    setIsDetecting(true)
    setDetectionResult(null)

    try {
      const response = await fetch(`${API_BASE_URL}/detect_objects`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to detect objects")
      }

      const data = await response.json()
      setDetectionResult(data)

      toast({
        title: "Objects Detected",
        description: `Detected ${data.objects.length} objects in your environment.`,
      })
    } catch (error) {
      console.error("Error detecting objects:", error)
      toast({
        title: "Error",
        description: "Failed to detect objects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDetecting(false)
    }
  }

  const getDirectionIcon = (direction: string) => {
    switch (direction.toLowerCase()) {
      case "left":
        return <ArrowLeft className="h-8 w-8" />
      case "right":
        return <ArrowRight className="h-8 w-8" />
      case "up":
        return <ArrowUp className="h-8 w-8" />
      case "down":
        return <ArrowDown className="h-8 w-8" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Object Detection</CardTitle>
        <CardDescription>Detect objects in your environment and get direction suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleDetectObjects}
          className="w-full h-16 text-xl font-semibold"
          disabled={isDetecting}
          aria-label="Detect objects"
        >
          {isDetecting ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Detecting Objects...
            </>
          ) : (
            <>
              <Scan className="mr-3 h-6 w-6" />
              Detect Objects
            </>
          )}
        </Button>

        {detectionResult && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Detected Objects:</h3>
              <div className="flex flex-wrap gap-2">
                {detectionResult.objects.map((obj, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                  >
                    {obj.name} ({Math.round(obj.confidence * 100)}%)
                  </div>
                ))}
              </div>
            </div>

            {detectionResult.direction && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Direction Suggestion:</h3>
                <div className="flex items-center gap-3">
                  {getDirectionIcon(detectionResult.direction)}
                  <p className="text-lg font-medium">Move {detectionResult.direction}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Instructions: Press the button to scan your surroundings. The app will identify objects and suggest
          directions.
        </p>
      </CardContent>
    </Card>
  )
}
