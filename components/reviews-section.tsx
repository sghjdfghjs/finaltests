"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Review = {
  name: string
  rating: number
  date: string
  text: string
}

const reviews: Review[] = [
  {
    name: "Наталья",
    rating: 5,
    date: "15.12.2025",
    text: "Грамотный специалист, профессионал своего дела! Мотивирует к действию. Очень доходчиво объясняет правильность выполнения упражнений, для меня это важно! Тренера рекомендую!",
  },
  {
    name: "Дмитрий",
    rating: 5,
    date: "08.12.2025",
    text: "Грамотный специалист, тренируюсь с ним по двум направлениям, силовые тренировки и бокс. Рекомендую",
  },
  {
    name: "Евгений",
    rating: 5,
    date: "28.11.2025",
    text: "Грамотный специалист! Советую.",
  },
  {
    name: "Светлана",
    rating: 5,
    date: "15.12.2025",
    text: "Отличный тренер, грамотный специалист. Провел первую вводную тренировку, мне понравился подход к клиенту. Планирую дальше тренироваться под его руководством",
  },
  {
    name: "Александр",
    rating: 5,
    date: "10.12.2025",
    text: "Профессиональный подход к тренировкам. Рекомендую всем, кто хочет достичь результата!",
  },
]

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = scrollContainer.scrollLeft
    const scrollSpeed = 0.5

    const animate = () => {
      if (!isPaused && !isDragging && scrollContainer) {
        scrollPosition += scrollSpeed

        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }

        scrollContainer.scrollLeft = scrollPosition
      } else if (scrollContainer && !isDragging) {
        scrollPosition = scrollContainer.scrollLeft
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isPaused, isDragging])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    setIsPaused(true)
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX
    setStartX(pageX - scrollRef.current!.offsetLeft)
    setScrollLeft(scrollRef.current!.scrollLeft)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX
    const x = pageX - scrollRef.current!.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 300)
  }

  return (
    <section id="reviews" className="py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-normal mb-8 text-foreground">Отзывы</h2>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden"
            style={{ scrollBehavior: "auto", cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[400px] bg-card rounded-3xl p-6 hover:shadow-lg transition-shadow select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => !isDragging && setIsPaused(false)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground">{review.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Image key={i} src="/images/star.svg" alt="star" width={16} height={16} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-foreground/80 mb-3">{review.date}</p>

                <p className="text-foreground/90 mb-4 leading-relaxed">{review.text}</p>

                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <span className="text-sm text-foreground/60">источник:</span>
                  <Image src="/images/xfit-logo.svg" alt="X-fit" width={60} height={12} className="h-3 w-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
