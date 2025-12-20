"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

type GalleryCategory = "gym" | "boxing" | "students"
type MediaItem = {
  url: string
  type: "image" | "video"
  public_id?: string
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("gym")
  const [media, setMedia] = useState<Record<GalleryCategory, MediaItem[]>>({
    gym: [],
    boxing: [],
    students: [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState<{ item: MediaItem; index: number } | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const categories = [
    { id: "gym" as GalleryCategory, label: "Зал" },
    { id: "boxing" as GalleryCategory, label: "Бокс" },
    { id: "students" as GalleryCategory, label: "Ученики" },
  ]

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
        const response = await fetch(`${basePath}/gallery.json?t=${Date.now()}`, {
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
      if (!selectedMedia) return

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

  return (
    <section id="gallery" className="py-12 px-4 bg-background lg:pt-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-normal mb-8 text-foreground">Галерея</h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="md:w-48 md:flex-shrink-0">
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-card-foreground hover:bg-card/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="text-center text-muted-foreground py-12">Загрузка...</div>
            ) : media[activeCategory].length === 0 ? (
              <div className="text-center text-muted-foreground py-12">Пока нет медиа в этом разделе</div>
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

      {selectedMedia && (
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

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            ESC для закрытия • ← → для навигации
          </div>
        </div>
      )}
    </section>
  )
}
