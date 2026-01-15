"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Review = {
  name: string
  rating: number
  date: string
  text: string
  avatar?: string
}

const reviews: Review[] = [
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
    text: "Отличный тренер, грамотный специалист. Провел первую вводную тренировку, мне понравился подход к клиенту. Планирую дальше тренироваться под его руководством.",
  },
  {
    name: "Александр",
    rating: 5,
    date: "23.12.2025",
    text: "Ян - непревзойденный профессионал своего дела! Грамотно выстраивает тренировочный процесс, рассказывает и демонстрирует, как правильно выполнять упражнения. Внимательно наблюдает и корректирует выполнение. Разъясняет биодинамику упражнений, какие мышцы прорабатываются. Впервые встретил такого замечательного специалиста. Очень комфортно с ним тренироваться!",
  },
  {
    name: "Николь",
    rating: 5,
    date: "23.12.2025",
    text: "Тренер на высшем уровне! Все грамотно объясняет, очень комфортно было заниматься",
  },
  {
    name: "Никита",
    rating: 5,
    date: "23.12.2025",
    text: "Отличный тренер, очень понравился подход к клиентам, беру уже второй блок занятий",
  },
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
    name: "Михаил",
    rating: 5,
    date: "14.01.2026",
    text: "Профи своего дела. Ян быстро увидел ошибки в моей технике: не просто показал, как надо, а подробно, наглядно объяснил и помог разобраться. Подстроился под меня и мой уровень. Буду продолжать заниматься и развиваться дальше.",
  },
  {
    name: "Александр",
    rating: 5,
    date: "14.01.2026",
    text: "Хочу выразить огромную благодарность Яну. Уже несколько месяцев занимаюсь боксом под его руководством, и результаты превзошли все мои ожидания.",
  },
]

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getVisibleReviews = () => {
    const visible = []
    for (let i = 0; i < cardsPerView; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length])
    }
    return visible
  }

  return (
    <section id="reviews" className="py-16 px-4 relative z-0">
      <div className="max-w-7xl mx-auto relative z-0">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-foreground">Отзывы</h2>

        <div className="relative px-12 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getVisibleReviews().map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-6 relative overflow-hidden transition-all duration-300"
              >
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div
                  className="absolute right-[-10%] top-[-10%] w-[120px] h-[120px] rounded-full blur-[80px] pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(178, 220, 118, 0.25), transparent 70%)" }}
                />

                {/* Avatar and name */}
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#71e23a] to-[#138a2c] flex-shrink-0 flex items-center justify-center text-white text-xl font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Image key={i} src="/images/star.svg" alt="star" width={16} height={16} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/60 mb-4 relative z-10">{review.date}</p>

                <p className="text-white/90 mb-6 leading-relaxed text-sm relative z-10">{review.text}</p>

                <div className="flex items-center gap-2 text-xs relative z-10">
                  <span className="text-white/40 uppercase">источник:</span>
                  <Image
                    src="/images/xfit-logo.svg"
                    alt="X-fit"
                    width={50}
                    height={10}
                    className="h-3 w-auto opacity-60"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#1A2228]/80 border border-[#b2dc76]/30 flex items-center justify-center text-[#b2dc76] hover:bg-[#1A2228] hover:shadow-[0_0_20px_rgba(178,220,118,0.4)] transition-all"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#1A2228]/80 border border-[#b2dc76]/30 flex items-center justify-center text-[#b2dc76] hover:bg-[#1A2228] hover:shadow-[0_0_20px_rgba(178,220,118,0.4)] transition-all"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all ${
                  index === currentIndex ? "w-6 h-2 bg-[#b2dc76]" : "w-2 h-2 bg-[#6B7280] hover:bg-[#b2dc76]/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
