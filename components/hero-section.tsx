"use client"

import { Check, CircleCheck, Clock, Star } from "lucide-react"

export function HeroSection() {
  const handleTelegramClick = () => {
    const message = "Здравствуйте, хочу записаться на пробную тренировку!"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/+79194498792?text=${encodedMessage}`, "_blank")
  }

  return (
    <section
      id="hero"
      className="relative pt-20 md:pt-24 pb-12 md:pb-20 px-4 md:px-6"
      style={{
        background:
          "radial-gradient(circle 350px at 65% 50%, rgba(178, 220, 118, 0.25), rgba(178, 220, 118, 0.12) 50%, transparent 75%)",
      }}
    >
      <div className="mx-auto max-w-[1400px] relative">
        <div className="relative rounded-3xl md:rounded-[32px] p-8 md:p-12 lg:p-16">
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
            {/* Left side - Trainer image with badges - shown first on mobile */}
            <div className="relative w-full flex items-end justify-center lg:justify-end min-h-[500px] md:min-h-[600px] lg:min-h-[700px] order-1 lg:order-2">
              <div
                className="absolute top-[0.5%] left-0 lg:top-[25%] lg:left-[2%] z-0 rounded-2xl p-4 backdrop-blur-md"
                style={{
                  background: "linear-gradient(135deg, rgba(26, 45, 26, 0.9), rgba(15, 26, 15, 0.9))",
                  border: "1px solid rgba(45, 74, 45, 0.5)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b2dc76]/20 flex items-center justify-center">
                    <CircleCheck className="w-5 h-5 text-[#b2dc76]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Сертифицированный</div>
                    <div className="text-xs text-[#b2dc76]">тренер</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-[18%] left-0 lg:top-[38%] lg:left-auto lg:right-[2%] z-0 rounded-2xl p-4 backdrop-blur-md"
                style={{
                  background: "linear-gradient(135deg, rgba(26, 45, 26, 0.9), rgba(15, 26, 15, 0.9))",
                  border: "1px solid rgba(45, 74, 45, 0.5)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b2dc76]/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#b2dc76]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">10 лет опыта</div>
                  </div>
                </div>
              </div>

              {/* Trainer image */}
              <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[650px] h-[500px] md:h-[600px] lg:h-[700px] z-10">
                <div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                  }}
                >
                  <img
                    src="/images/hero2.png"
                    alt="Тренер"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            {/* Right content - shown second on mobile */}
            <div className="flex flex-col space-y-6 md:space-y-8 relative z-10 order-2 lg:order-1">
              <div>
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white">
                  Приведу <span className="text-[#b2dc76]">в форму</span>
                  <br />
                  за 12 недель
                </h1>

                <p className="font-sans text-lg md:text-xl font-normal text-[#A1A7A4] leading-relaxed mt-4 md:mt-6">
                  Директор строительной компании - строю не только здания,
                  <br />
                  но и крепкие тела!
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#b2dc76] flex-shrink-0" strokeWidth={3} />
                  <span className="font-sans text-base md:text-lg font-medium text-[#D1D5DB]">
                    Индивидуальный подход
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#b2dc76] flex-shrink-0" strokeWidth={3} />
                  <span className="font-sans text-base md:text-lg font-medium text-[#D1D5DB]">
                    Контроль техники и прогресса
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#b2dc76] flex-shrink-0" strokeWidth={3} />
                  <span className="font-sans text-base md:text-lg font-medium text-[#D1D5DB]">
                    10 лет опыта, более 300 клиентов
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative w-fit">
                  <button
                    onClick={handleTelegramClick}
                    className="inline-flex items-center justify-center px-8 md:px-10 py-3.5 rounded-2xl font-sans text-base md:text-lg font-semibold transition-all hover:brightness-110 hover:-translate-y-0.5 bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40"
                  >
                    Записаться на первую тренировку
                  </button>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm">
                    <p className="text-sm text-[#E5E7EB] text-center font-medium whitespace-nowrap">
                      Первая консультация бесплатно
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 flex-wrap opacity-60">
                <img src="/images/xfit-logo.svg" alt="X-FIT" className="h-6 md:h-8 opacity-80" />
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-white">5.0</span>
                <span className="text-sm text-[#A1A7A4]">на основе 8 отзывов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
