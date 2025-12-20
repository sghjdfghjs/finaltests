"use client"

import { useState } from "react"
import { getImagePath } from "@/lib/image-path"

export function ServicesSection() {
  const [selectedType, setSelectedType] = useState<"Одиночная" | "Сплит (вдвоем)">("Одиночная")
  const [selectedSessions, setSelectedSessions] = useState("10")
  const [boxingSessions, setBoxingSessions] = useState("10")
  const [functionalSessions, setFunctionalSessions] = useState("10")

  const pricingData = {
    gym: {
      Одиночная: {
        "3": "6000₽",
        "5": "9000₽",
        "8": "14000₽",
        "10": "17000₽",
        "12": "18000₽",
      },
      "Сплит (вдвоем)": {
        "1": "2500₽",
        "5": "11500₽",
        "10": "22000₽",
        "12": "24000₽",
      },
    },
    boxing: {
      "3": "6000₽",
      "5": "9000₽",
      "8": "14000₽",
      "10": "17000₽",
      "12": "18000₽",
    },
    functional: {
      "3": "6000₽",
      "5": "9000₽",
      "8": "14000₽",
      "10": "17000₽",
      "12": "18000₽",
    },
  }

  const getSessionOptions = () => {
    if (selectedType === "Одиночная") {
      return ["3", "5", "8", "10", "12"]
    } else {
      return ["1", "5", "10", "12"]
    }
  }

  const getCurrentPrice = () => {
    return pricingData.gym[selectedType][selectedSessions as keyof typeof pricingData.gym.Одиночная] || "9900₽"
  }

  const getBoxingPrice = () => {
    return pricingData.boxing[boxingSessions as keyof typeof pricingData.boxing] || "17000₽"
  }

  const getFunctionalPrice = () => {
    return pricingData.functional[functionalSessions as keyof typeof pricingData.functional] || "17000₽"
  }

  const handleTypeChange = (type: "Одиночная" | "Сплит (вдвоем)") => {
    setSelectedType(type)
    const options = type === "Одиночная" ? ["3", "5", "8", "10", "12"] : ["1", "5", "10", "12"]
    setSelectedSessions(options.includes(selectedSessions) ? selectedSessions : options[3] || options[0])
  }

  const generateTelegramUrl = (serviceTitle: string, sessions: string, type?: string) => {
    let message = `Здравствуйте, я хочу оформить "${serviceTitle}"`
    if (type) {
      message += ` (${type})`
    }
    message += ` - ${sessions} тренировок`
    const encodedMessage = encodeURIComponent(message)
    return `https://t.me/+79194498792?text=${encodedMessage}`
  }

  return (
    <section id="services" className="py-12 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-light text-foreground mb-8 lg:text-4xl">Услуги</h2>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="bg-card rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden lg:flex-[5] lg:p-8">
              <div className="absolute left-[-15%] top-[-15%] w-[180px] h-[180px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="absolute right-0 bottom-0 w-[130px] h-[160px] md:w-[200px] md:h-[260px] lg:w-[280px] lg:h-[360px] pointer-events-none z-0 lg:right-2">
                <img
                  src={getImagePath("/images/vzale.png") || "/placeholder.svg"}
                  alt="Тренировки в зале"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-normal text-foreground mb-3 md:mb-4 lg:mb-6 text-balance max-w-[60%] lg:max-w-full">
                  Тренировки в зале
                </h3>

                <div className="flex flex-wrap gap-2 mb-3 md:mb-4 lg:mb-6">
                  <button
                    onClick={() => handleTypeChange("Одиночная")}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === "Одиночная"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Одиночные
                  </button>
                  <button
                    onClick={() => handleTypeChange("Сплит (вдвоем)")}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === "Сплит (вдвоем)"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Сплит (вдвоем)
                  </button>
                </div>

                <select
                  value={selectedSessions}
                  onChange={(e) => setSelectedSessions(e.target.value)}
                  className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[280px] bg-secondary text-foreground px-3 md:px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm border-0 mb-3 md:mb-4 lg:mb-6 cursor-pointer hover:bg-secondary/80 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCw2IEw4LDEwIEwxMiw2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:16px] bg-[right_0.75rem_center] lg:bg-[right_1rem_center] bg-no-repeat pr-10 lg:pr-12"
                >
                  {getSessionOptions().map((option) => (
                    <option key={option} value={option}>
                      {option} {option === "1" ? "тренировка" : "тренировок"}
                    </option>
                  ))}
                </select>

                <div className="mb-3 md:mb-4">
                  <p className="text-sm text-foreground/70 mb-1">ОТ</p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">{getCurrentPrice()}</p>
                </div>

                <a
                  href={generateTelegramUrl("Тренировки в зале", selectedSessions, selectedType)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] lg:max-w-xs inline-block text-center bg-primary text-primary-foreground px-4 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-lg font-medium hover:opacity-90 hover:shadow-lg transition-all duration-300"
                >
                  Оформить
                </a>
              </div>
            </div>

            <div className="hidden lg:block bg-card rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300 lg:flex-[2]">
              <h4 className="text-xl font-normal text-foreground mb-3">Преимущества всех тренировок</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>1. Индивидуальный подход к каждому клиенту</li>
                <li>2. Помощь в похудении/наборе массы</li>
                <li>3. Составление программы питания</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-card rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden flex-1">
              <div className="absolute right-[-15%] top-[-15%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="absolute right-0 bottom-0 w-[130px] h-[160px] md:w-[160px] md:h-[180px] lg:w-[180px] lg:h-[200px] pointer-events-none z-0">
                <img
                  src={getImagePath("/images/box.png") || "/placeholder.svg"}
                  alt="Тренировки по боксу"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <h3 className="text-xl md:text-2xl font-normal text-foreground mb-3 md:mb-4 text-balance max-w-[60%]">
                  Тренировки по боксу
                </h3>

                <select
                  value={boxingSessions}
                  onChange={(e) => setBoxingSessions(e.target.value)}
                  className="w-full max-w-[200px] md:max-w-[220px] bg-secondary text-foreground px-3 md:px-4 py-2 rounded-lg text-sm border-0 mb-3 md:mb-4 cursor-pointer hover:bg-secondary/80 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCw2IEw4LDEwIEwxMiw2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                >
                  {["3", "5", "8", "10", "12"].map((option) => (
                    <option key={option} value={option}>
                      {option} тренировок
                    </option>
                  ))}
                </select>

                <div className="mb-3 md:mb-4">
                  <p className="text-sm text-foreground/70 mb-1">ОТ</p>
                  <p className="text-3xl md:text-4xl font-semibold text-foreground">{getBoxingPrice()}</p>
                </div>

                <a
                  href={generateTelegramUrl("Тренировки по боксу", boxingSessions)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] inline-block text-center bg-primary text-primary-foreground px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:opacity-90 hover:shadow-lg transition-all duration-300"
                >
                  Оформить
                </a>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden flex-1">
              <div className="absolute right-[-15%] bottom-[-15%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="absolute right-0 bottom-0 w-[130px] h-[160px] md:w-[160px] md:h-[180px] lg:w-[180px] lg:h-[200px] pointer-events-none z-0">
                <img
                  src={getImagePath("/images/functional.png") || "/placeholder.svg"}
                  alt="Функциональные тренировки"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <h3 className="text-xl md:text-2xl font-normal text-foreground mb-3 md:mb-4 text-balance max-w-[60%]">
                  Функциональные тренировки
                </h3>

                <select
                  value={functionalSessions}
                  onChange={(e) => setFunctionalSessions(e.target.value)}
                  className="w-full max-w-[200px] md:max-w-[220px] bg-secondary text-foreground px-3 md:px-4 py-2 rounded-lg text-sm border-0 mb-3 md:mb-4 cursor-pointer hover:bg-secondary/80 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCw2IEw4LDEwIEwxMiw2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                >
                  {["3", "5", "8", "10", "12"].map((option) => (
                    <option key={option} value={option}>
                      {option} тренировок
                    </option>
                  ))}
                </select>

                <div className="mb-3 md:mb-4">
                  <p className="text-sm text-foreground/70 mb-1">ОТ</p>
                  <p className="text-3xl md:text-4xl font-semibold text-foreground">{getFunctionalPrice()}</p>
                </div>

                <a
                  href={generateTelegramUrl("Функциональные тренировки", functionalSessions)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] inline-block text-center bg-primary text-primary-foreground px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:opacity-90 hover:shadow-lg transition-all duration-300"
                >
                  Оформить
                </a>
              </div>
            </div>
          </div>

          <div className="lg:hidden bg-card rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-xl font-normal text-foreground mb-3">Преимущества всех тренировок</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>1. Индивидуальный подход к каждому клиенту</li>
              <li>2. Помощь в похудении/наборе массы</li>
              <li>3. Составление программы питания</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
