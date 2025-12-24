"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryCategory = "gym" | "boxing" | "students"
type MediaItem = {
  url: string
  type: "image" | "video"
  public_id?: string
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | null>(null)
  const [media, setMedia] = useState<Record<GalleryCategory, MediaItem[]>>({
    gym: [],
    boxing: [],
    students: [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState<{ item: MediaItem; index: number } | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const categories = [
    { id: "gym" as GalleryCategory, label: "Зал" },
    { id: "boxing" as GalleryCategory, label: "Бокс" },
    { id: "students" as GalleryCategory, label: "Ученики" },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const setDefaultCategory = () => {
      if (window.innerWidth >= 768) {
        setActiveCategory("gym")
      }
    }

    setDefaultCategory()
    window.addEventListener("resize", setDefaultCategory)
    return () => window.removeEventListener("resize", setDefaultCategory)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
        const response = await fetch(`/gallery.json?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })
        const data = await response.json()
        const filteredData: Record<GalleryCategory, MediaItem[]> = {
          gym: [],
          boxing: [],
          students: [],
        }

        Object.keys(data).forEach((key) => {
          const category = key as GalleryCategory
          if (Array.isArray(data[category])) {
            filteredData[category] = data[category].filter(
              (item: MediaItem) => item && item.url && item.url.trim() !== "",
            )
          }
        })

        setMedia(filteredData)
        setRefreshKey((prev) => prev + 1)
      } catch (error) {
        console.error("Failed to load gallery:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()

    const interval = setInterval(fetchGallery, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia || !activeCategory) return

      if (e.key === "Escape") {
        setSelectedMedia(null)
      } else if (e.key === "ArrowLeft") {
        const currentItems = media[activeCategory]
        const newIndex = selectedMedia.index > 0 ? selectedMedia.index - 1 : currentItems.length - 1
        setSelectedMedia({ item: currentItems[newIndex], index: newIndex })
      } else if (e.key === "ArrowRight") {
        const currentItems = media[activeCategory]
        const newIndex = selectedMedia.index < currentItems.length - 1 ? selectedMedia.index + 1 : 0
        setSelectedMedia({ item: currentItems[newIndex], index: newIndex })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedMedia, media, activeCategory])

  const getSliderPosition = () => {
    // Button widths: Зал = 70px, Бокс = 80px, Ученики = 100px
    if (activeCategory === "gym") return "4px"
    if (activeCategory === "boxing") return "74px" // 4px + 70px
    return "154px" // 4px + 70px + 80px
  }

  const getSliderWidth = () => {
    if (activeCategory === "gym") return "70px"
    if (activeCategory === "boxing") return "80px"
    return "100px"
  }

  const handlePrevious = () => {
    if (!activeCategory) return
    const totalItems = media[activeCategory].length
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1))
  }

  const handleNext = () => {
    if (!activeCategory) return
    const totalItems = media[activeCategory].length
    setCurrentIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0))
  }

  return (
    <section id="gallery" className="pt-8 md:pt-16 pb-16 px-4 md:px-6 bg-[#0E1215]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-10 lg:mb-16 text-center">
          Галерея
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="relative bg-[#1A2228] rounded-lg p-1 inline-flex">
              <div
                className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out bg-[#b2dc76]"
                style={{
                  width: getSliderWidth(),
                  left: getSliderPosition(),
                }}
              />

              <button
                onClick={() => setActiveCategory("gym")}
                className={`relative z-10 px-5 py-2 md:py-2.5 rounded-md text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  activeCategory === "gym" ? "text-[#0A1F12]" : "text-[#6B7280] hover:text-white"
                }`}
                style={{ width: "70px" }}
              >
                Зал
              </button>
              <button
                onClick={() => setActiveCategory("boxing")}
                className={`relative z-10 px-5 py-2 md:py-2.5 rounded-md text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  activeCategory === "boxing" ? "text-[#0A1F12]" : "text-[#6B7280] hover:text-white"
                }`}
                style={{ width: "80px" }}
              >
                Бокс
              </button>
              <button
                onClick={() => setActiveCategory("students")}
                className={`relative z-10 px-5 py-2 md:py-2.5 rounded-md text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  activeCategory === "students" ? "text-[#0A1F12]" : "text-[#6B7280] hover:text-white"
                }`}
                style={{ width: "100px" }}
              >
                Ученики
              </button>
            </div>
          </div>

          <div className="w-full">
            {!activeCategory ? (
              <div className="text-center text-muted-foreground py-12">Выберите раздел</div>
            ) : loading ? (
              <div className="text-center text-muted-foreground py-12">Загрузка...</div>
            ) : media[activeCategory].length === 0 ? (
              <div className="text-center text-muted-foreground py-12">Пока нет медиа в этом разделе</div>
            ) : isMobile ? (
              <div className="relative">
                <div className="aspect-[4/3] bg-card rounded-xl overflow-hidden">
                  {media[activeCategory][currentIndex].type === "video" ? (
                    <video
                      src={media[activeCategory][currentIndex].url}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      onClick={() =>
                        setSelectedMedia({ item: media[activeCategory][currentIndex], index: currentIndex })
                      }
                    />
                  ) : (
                    <img
                      src={media[activeCategory][currentIndex].url || "/placeholder.svg"}
                      alt={`${activeCategory} ${currentIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      loading="lazy"
                      onClick={() =>
                        setSelectedMedia({ item: media[activeCategory][currentIndex], index: currentIndex })
                      }
                      onError={(e) => {
                        console.error("[v0] Image failed to load:", media[activeCategory][currentIndex].url)
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  )}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#1A2228]/80 border border-[#b2dc76]/30 flex items-center justify-center text-[#b2dc76] hover:bg-[#1A2228] hover:shadow-[0_0_20px_rgba(178,220,118,0.4)] transition-all z-10"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#1A2228]/80 border border-[#b2dc76]/30 flex items-center justify-center text-[#b2dc76] hover:bg-[#1A2228] hover:shadow-[0_0_20px_rgba(178,220,118,0.4)] transition-all z-10"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {media[activeCategory].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-[#b2dc76] w-6" : "bg-[#6B7280]"
                      }`}
                      aria-label={`Перейти к фото ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {media[activeCategory].map((item, index) => (
                  <div
                    key={`${activeCategory}-${item.public_id || item.url}-${index}-${refreshKey}`}
                    className="aspect-[4/3] bg-card rounded-xl overflow-hidden relative cursor-pointer group"
                    onClick={() => setSelectedMedia({ item, index })}
                  >
                    {item.type === "video" ? (
                      <video src={item.url} className="w-full h-full object-cover" preload="metadata" />
                    ) : (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={`${activeCategory} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          console.error("[v0] Image failed to load:", item.url)
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        Нажмите для просмотра
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMedia && activeCategory && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.item.type === "video" ? (
              <video src={selectedMedia.item.url} controls autoPlay className="max-w-full max-h-full rounded-lg" />
            ) : (
              <img
                src={selectedMedia.item.url || "/placeholder.svg"}
                alt={`${activeCategory} ${selectedMedia.index + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm"></div>
        </div>
      )}
    </section>
  )
}
