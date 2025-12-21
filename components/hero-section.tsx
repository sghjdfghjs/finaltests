"use client"

import { useState, useEffect } from "react"

const WORDS = ["профессиональные", "качественные"]

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = WORDS[currentWordIndex]

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length)
      return
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText(currentWord.substring(0, displayText.length - 1))
        } else {
          setDisplayText(currentWord.substring(0, displayText.length + 1))
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex])

  return (
    <section id="hero" className="relative overflow-hidden bg-background pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="bg-card rounded-[32px] md:rounded-[40px] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute right-[20%] bottom-[10%] w-[200px] h-[200px] md:right-[5%] md:bottom-0 md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-6 md:space-y-8 relative z-10 order-2 lg:order-1">
              <div>
                <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground mb-4 md:mb-6">
                  Профессиональные услуги тренера
                </h1>

                <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed">
                  Директор строительной компании - строю не только здания, но и крепкие тела!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md">
                <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-3 md:p-4 aspect-square flex flex-col items-start justify-start gap-1">
                  <div className="text-xl md:text-2xl font-bold text-foreground">999+</div>
                  <div className="text-[10px] md:text-xs font-light text-foreground/70 text-left">клиентов</div>
                </div>

                <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-3 md:p-4 aspect-square flex flex-col items-start justify-start gap-1">
                  <div className="text-xl md:text-2xl font-bold text-foreground">100K+</div>
                  <div className="text-[10px] md:text-xs font-light text-foreground/70 text-left">тренировок</div>
                </div>

                <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-3 md:p-4 aspect-square flex flex-col items-start justify-start gap-1">
                  <div className="text-xl md:text-2xl font-bold text-foreground">10+</div>
                  <div className="text-[10px] md:text-xs font-light text-foreground/70 text-left">лет в зале</div>
                </div>
              </div>

              <div>
                <a
                  href="#services"
                  className="inline-block bg-primary px-8 md:px-10 py-3 md:py-4 rounded-xl font-sans text-base md:text-lg font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg"
                >
                  Начать тренировки
                </a>
              </div>
            </div>

            <div className="relative w-full flex items-end justify-center lg:justify-end order-1 lg:order-2 lg:absolute lg:right-[-5%] lg:bottom-0 lg:w-1/2">
              <div className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-none lg:max-h-[600px]">
                <img
                  src="./images/hero-trainer.png"
                  alt="Тренер"
                  className="w-full h-auto object-contain object-bottom"
                  style={{
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
