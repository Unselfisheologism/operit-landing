import { useEffect, useRef, useState } from "react"

const SPEEDS = [0.5, 1, 2]

export default function PhoneVideoPlayer({
  videos,
}: {
  videos: { src: string; description: string }[]
}) {
  const [index, setIndex] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(1)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const speed = SPEEDS[speedIdx]

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = speed
  }, [speed, index])

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + videos.length) % videos.length)
    setProgress(0)
  }

  const onEnded = () => {
    setIndex((i) => (i + 1) % videos.length)
    setProgress(0)
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (v && v.duration > 0) setProgress((v.currentTime / v.duration) * 100)
  }

  return (
    <div className="w-full h-full flex flex-col bg-black rounded-xl overflow-hidden relative">
      {/* thin progress bar */}
      <div className="h-1 w-full bg-white/20">
        <div className="h-full bg-[#f97316]" style={{ width: `${progress}%` }} />
      </div>

      <video
        key={videos[index].src}
        ref={videoRef}
        src={videos[index].src}
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        className="flex-1 min-h-0 object-contain"
      />

      {/* description + controls */}
      <div className="bg-black/90 text-white text-xs px-3 py-2">
        <p className="mb-1.5 leading-snug">{videos[index].description}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous video"
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/25 active:scale-95 transition"
          >
            ◀
          </button>
          <button
            onClick={() => setSpeedIdx((s) => Math.max(0, s - 1))}
            disabled={speedIdx === 0}
            aria-label="Slow down"
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/25 active:scale-95 transition disabled:opacity-30"
          >
            ⏪
          </button>
          <span className="tabular-nums text-[11px] text-white/70 w-10 text-center">
            {speed}×
          </span>
          <button
            onClick={() => setSpeedIdx((s) => Math.min(SPEEDS.length - 1, s + 1))}
            disabled={speedIdx === SPEEDS.length - 1}
            aria-label="Fast forward"
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/25 active:scale-95 transition disabled:opacity-30"
          >
            ⏩
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next video"
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/25 active:scale-95 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
