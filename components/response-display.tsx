import { Card, CardContent } from "@/components/ui/card"
import { Mic, Check, Smile, Compass, Eye } from "lucide-react"

interface ResponseDisplayProps {
  response: {
    command?: string
    action?: string
    emotion?: string
    direction?: string
    objects?: string[]
  }
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  const getEmotionEmoji = (emotion: string) => {
    switch (emotion?.toLowerCase()) {
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
        return "😐"
    }
  }

  const getDirectionIcon = (direction: string) => {
    switch (direction?.toLowerCase()) {
      case "left":
        return "⬅️"
      case "right":
        return "➡️"
      case "up":
        return "⬆️"
      case "down":
        return "⬇️"
      default:
        return "🧭"
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Bharat's Response</h3>

        {response.command && (
          <div className="flex items-start space-x-3">
            <Mic className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Voice Command:</p>
              <p className="text-lg">{response.command}</p>
            </div>
          </div>
        )}

        {response.action && (
          <div className="flex items-start space-x-3">
            <Check className="h-6 w-6 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Action Performed:</p>
              <p className="text-lg">{response.action}</p>
            </div>
          </div>
        )}

        {response.objects && response.objects.length > 0 && (
          <div className="flex items-start space-x-3">
            <Eye className="h-6 w-6 text-indigo-500 mt-0.5" />
            <div>
              <p className="font-medium">Objects Detected:</p>
              <ul className="list-disc pl-5">
                {response.objects.map((obj, idx) => (
                  <li key={idx} className="text-lg capitalize">
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {response.emotion && (
          <div className="flex items-start space-x-3">
            <Smile className="h-6 w-6 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium">Emotion Detected:</p>
              <p className="text-lg">
                {getEmotionEmoji(response.emotion)} {response.emotion}
              </p>
            </div>
          </div>
        )}

        {response.direction && (
          <div className="flex items-start space-x-3">
            <Compass className="h-6 w-6 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Direction Guidance:</p>
              <p className="text-lg">
                {getDirectionIcon(response.direction)} Move {response.direction}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
