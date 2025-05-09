interface VoiceWaveProps {
  active: boolean
}

export function VoiceWave({ active }: VoiceWaveProps) {
  if (!active) return null

  return (
    <div className="flex items-center justify-center h-8 space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-primary w-1.5 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1s",
            height: `${16 + Math.random() * 24}px`,
          }}
        />
      ))}
    </div>
  )
}
