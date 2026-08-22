import { useEffect, useRef, useState } from "react"

const SPEEDS = [0.5, 1, 2]

function FastForwardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="fast forward" viewBox="0 0 171 129" className="w-4 h-4">
      <path d="M11.2 9 9 11.1v107.8l2.7 2.1q2.7 2.1 5.1 1.5 3.2-.7 53.7-40.3l14-10.9.5 23.9c.5 23.8.5 24 2.9 25.9 4.2 3.4 2.9 4.2 43.2-27 17.7-13.8 30-24 30.7-25.7 2.3-5 .2-8.1-12.6-18.1l-19.7-15.5C103.5 14.3 93.5 7 91.4 7c-1.2 0-3.2 1.2-4.3 2.6-2 2.5-2.1 3.9-2.1 26 0 12.9-.2 23.4-.5 23.4s-7-5.1-14.8-11.3C34.5 19.6 17.8 7 15.6 7a8 8 0 0 0-4.4 2M23 17.1c51.4 40.1 59.1 46.4 58.8 48.3-.4 2.8-65 53.2-66.8 52.1-1.6-1-1.3-105.5.3-105.5.6 0 4.1 2.3 7.7 5.1m101.5 20c17.6 13.9 32.3 25.7 32.7 26.3q.7 1 .8 2.3c0 1.6-64.2 51.8-66.3 51.8-.9 0-1.3-13.5-1.5-51.5-.1-28.3 0-52.1.3-52.8q.4-1 1.3-1.2a890 890 0 0 1 32.7 25.1"></path>
    </svg>
  )
}

function SlowDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="rewind pair arrows" viewBox="0 0 152 110" className="w-4 h-4">
      <path d="M132.9 8.7a768 768 0 0 0-35.4 27.2c-21.6 17.4-22.4 18.6-15.7 25 7.6 7.2 54.8 42.1 56.9 42.1 5.4 0 5.3.6 5.3-49 0-40.4-.2-46-1.6-47.4-2.3-2.3-3.6-2-9.5 2.1m6.1 6.5c.2 29.9 0 82.2-.3 82.5-.5.4-50-36.8-53.6-40.2-1.3-1.3-2-2.8-1.7-3.4 1.5-2.3 53.3-43.1 54.9-43.1.4 0 .7 1.9.7 4.2M61.9 9.7a750 750 0 0 0-38.1 30C9.1 51.9 7.1 54.5 8.5 58.8 9.6 62.4 64.1 104 67.7 104c5.4 0 5.3.6 5.3-48.6a506 506 0 0 0-1-47.5c-1.6-2.8-4.1-2.4-10.1 1.8M68 55.5c0 23.9-.2 43.5-.5 43.5C65.6 99 13 57.8 13 56.3c0-1.3 13.2-12.5 34.5-29.4C64.1 13.7 66.4 12 67.3 12c.4 0 .7 19.6.7 43.5"></path>
    </svg>
  )
}

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
            <SlowDownIcon />
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
            <FastForwardIcon />
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
