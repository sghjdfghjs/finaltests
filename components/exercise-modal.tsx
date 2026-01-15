"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  exercise: {
    title: string
    muscle: string
    goal: string
    steps: string[]
    important: string[]
    suitable: string[]
    videoUrl?: string
  }
}

export function ExerciseModal({ isOpen, onClose, exercise }: ExerciseModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const toggleFullscreen = () => {
    if (videoRef.current) {
      // Check if video element has webkit fullscreen method (iOS Safari)
      if ("webkitEnterFullscreen" in videoRef.current) {
        try {
          ;(videoRef.current as any).webkitEnterFullscreen()
        } catch (err) {
          console.error("Error entering fullscreen on iOS:", err)
        }
      }
      // Standard fullscreen API (Desktop and Android)
      else if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err)
        })
      } else {
        document.exitFullscreen()
      }
    }
  }

  const handleTelegramClick = () => {
    const message = "Здравствуйте, хочу записаться на пробную тренировку!"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/+79194498792?text=${encodedMessage}`, "_blank")
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = "unset"
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1)
      }
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
        setCurrentTime(0)
      }
    }
    return () => {
      document.body.style.overflow = "unset"
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-start md:items-center justify-center md:p-4 pointer-events-auto overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full md:max-w-5xl min-h-screen md:min-h-0 md:max-h-[90vh] bg-gradient-to-br from-[#0d1a0d] to-[#050f05] md:rounded-3xl border-t md:border border-[#2d4a2d]/50 shadow-2xl pointer-events-auto z-10 overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky md:absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 ml-auto mr-4 md:mr-0 mt-4 md:mt-0"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Content */}
        <div className="p-4 md:p-12 pt-4 md:pt-12">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Left side - Video */}
            <div className="relative aspect-[4/3] md:aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              {exercise.videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={`${exercise.videoUrl}#t=0.1`}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    playsInline
                    preload="metadata"
                    loop
                    muted
                  />
                  {/* Video controls overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-white rounded-full"></div>
                          <div className="w-1 h-4 bg-white rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        {isMuted ? (
                          <path
                            fillRule="evenodd"
                            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 011.414 1.414zm-2.829 2.828a1 1 0 011.415 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </button>
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      style={{
                        background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${
                          (currentTime / (duration || 1)) * 100
                        }%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`,
                      }}
                    />
                    <span className="text-xs text-white/80 font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/images/image.png" alt={exercise.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Right side - Details */}
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">Упражнение «{exercise.title}»</h2>
              <p className="text-base md:text-lg text-gray-400 mb-4 md:mb-6">{exercise.muscle}</p>

              {/* Goal */}
              <div className="px-3 md:px-4 py-2 md:py-3 rounded-xl bg-[#b2dc76]/20 border border-[#b2dc76]/30 mb-4 md:mb-6">
                <p className="text-sm text-[#b2dc76]">
                  <span className="font-semibold">Цель:</span> {exercise.goal}
                </p>
              </div>

              {/* Steps */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Как делать:</h3>
                <ol className="space-y-1.5 md:space-y-2">
                  {exercise.steps.map((step, index) => (
                    <li key={index} className="text-sm md:text-base text-gray-300 flex gap-2 md:gap-3">
                      <span className="text-white font-semibold">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Important */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-[#D4A840] mb-2 md:mb-3">Важно:</h3>
                <ul className="space-y-1.5 md:space-y-2">
                  {exercise.important.map((item, index) => (
                    <li key={index} className="text-sm md:text-base text-gray-300 flex gap-2 md:gap-3">
                      <span className="text-[#D4A840] mt-1.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="relative w-full mt-auto mb-6 md:mb-0">
                <button
                  onClick={handleTelegramClick}
                  className="w-full px-6 md:px-8 py-3 md:py-4 rounded-2xl font-sans text-base md:text-lg font-semibold transition-all hover:brightness-110 hover:-translate-y-0.5 bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40"
                >
                  Записаться на пробную тренировку
                </button>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm">
                  <p className="text-xs md:text-sm text-[#E5E7EB] text-center font-medium whitespace-nowrap">
                    Первая консультация бесплатно
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
