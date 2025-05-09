"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { SmilePlus, Loader2 } from "lucide-react"

interface EmotionResult {
  emotion: string
  confidence: number
}

export default function EmotionAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [emotionResult, setEmotionResult] = useState<EmotionResult | null>(null)
  const { toast } = useToast()

  const handleAnalyzeEmotion = async () => {
    setIsAnalyzing(true)
    setEmotionResult(null)

    try {
      const response = await fetch("http://localhost:8000/analyze_emotion", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to analyze emotion")
      }

      const data = await response.json()
      setEmotionResult(data)

      toast({
        title: "Emotion Analyzed",
        description: `Detected emotion: ${data.emotion}`,
      })
    } catch (error) {
      console.error("Error analyzing emotion:", error)
      toast({
        title: "Error",
        description: "Failed to analyze emotion. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return "😊"
      case "sad":
        return "😢"
      case "angry":
        return "😠"
      case "surprised":
        return "😲"
      case "neutral":
        return "😐"
      case "fear":
        return "😨"
      case "disgust":
        return "🤢"
      default:
        return "❓"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Emotion Analysis</CardTitle>
        <CardDescription>Analyze the emotion of people in your environment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleAnalyzeEmotion}
          className="w-full h-16 text-xl font-semibold"
          disabled={isAnalyzing}
          aria-label="Analyze emotion"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Analyzing Emotion...
            </>
          ) : (
            <>
              <SmilePlus className="mr-3 h-6 w-6" />
              Analyze Emotion
            </>
          )}
        </Button>

        {emotionResult && (
          <div className="mt-6">
            <div className="p-4 bg-muted rounded-lg flex items-center gap-4">
              <span className="text-4xl" role="img" aria-label={emotionResult.emotion}>
                {getEmotionEmoji(emotionResult.emotion)}
              </span>
              <div>
                <h3 className="font-semibold">Detected Emotion:</h3>
                <p className="text-xl font-medium">{emotionResult.emotion}</p>
                <p className="text-sm text-muted-foreground">
                  Confidence: {Math.round(emotionResult.confidence * 100)}%
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Instructions: Press the button to analyze the emotion of people in front of the camera.
        </p>
      </CardContent>
    </Card>
  )
}
