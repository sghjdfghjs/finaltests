"use client"

import { useState } from "react"

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
    <section id="services" className="py-16 px-4 md:px-6 relative z-10 pb-8">
      <div className="mx-auto max-w-[1400px] relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-10 lg:mb-16 text-center">
          Мои <span className="text-[#b2dc76]">услуги</span>
        </h2>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-6 lg:p-8 relative overflow-hidden lg:flex-[5] transition-all duration-300">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div
                className="absolute left-[-10%] top-[-10%] w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full blur-[100px] pointer-events-none z-0 lg:right-2"
                style={{ background: "radial-gradient(circle, rgba(178, 220, 118, 0.25), transparent 70%)" }}
              />

              <div className="absolute right-0 bottom-0 w-[130px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[280px] lg:h-[360px] pointer-events-none z-0 lg:right-2">
                <img
                  src="./images/vzale.png"
                  alt="Тренировки в зале"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 lg:mb-6 text-balance max-w-[60%] lg:max-w-full lg:whitespace-nowrap">
                  Тренировки <span className="text-[#b2dc76]">в зале</span>
                </h3>

                <div className="relative bg-[#1A2228] rounded-lg p-1 mb-3 md:mb-4 lg:mb-6 inline-flex w-fit">
                  <div
                    className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out bg-[#b2dc76]"
                    style={{
                      width: selectedType === "Одиночная" ? "120px" : "144px",
                      left: selectedType === "Одиночная" ? "4px" : "124px",
                    }}
                  />

                  <button
                    onClick={() => handleTypeChange("Одиночная")}
                    className={`relative z-10 px-5 py-2 md:py-2.5 rounded-md text-sm font-medium transition-colors duration-300 whitespace-nowrap w-[120px] ${
                      selectedType === "Одиночная" ? "text-[#0A1F12]" : "text-[#6B7280] hover:text-white"
                    }`}
                  >
                    Одиночные
                  </button>
                  <button
                    onClick={() => handleTypeChange("Сплит (вдвоем)")}
                    className={`relative z-10 px-5 py-2 md:py-2.5 rounded-md text-sm font-medium transition-colors duration-300 whitespace-nowrap w-[144px] ${
                      selectedType === "Сплит (вдвоем)" ? "text-[#0A1F12]" : "text-[#6B7280] hover:text-white"
                    }`}
                  >
                    Сплит (вдвоем)
                  </button>
                </div>

                <select
                  value={selectedSessions}
                  onChange={(e) => setSelectedSessions(e.target.value)}
                  className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[280px] bg-[#1A2228] text-white px-3 md:px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm border-0 mb-3 md:mb-4 lg:mb-6 cursor-pointer hover:bg-[#242C34] transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCw2IEw4LDEwIEwxMiw2IiBzdHJva2U9IiNiMmRjNzYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:16px] bg-[right_0.75rem_center] lg:bg-[right_1rem_center] bg-no-repeat pr-10 lg:pr-12"
                >
                  {getSessionOptions().map((option) => (
                    <option key={option} value={option}>
                      {option} {option === "1" ? "тренировка" : "тренировок"}
                    </option>
                  ))}
                </select>

                <div className="mb-3 md:mb-4">
                  <p className="text-sm text-[#A1A7A4] mb-1">ОТ</p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">{getCurrentPrice()}</p>
                </div>

                <a
                  href={generateTelegramUrl("Тренировки в зале", selectedSessions, selectedType)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] lg:max-w-xs inline-block text-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40 bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black"
                >
                  Оформить
                </a>
              </div>
            </div>

            <div className="hidden lg:block bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-6 transition-all duration-300 lg:flex-[2]">
              <h4 className="text-xl font-semibold text-white mb-3">Преимущества всех тренировок</h4>
              <ul className="space-y-2 text-sm text-[#D1D5DB]">
                <li>1. Индивидуальный подход к каждому клиенту</li>
                <li>2. Помощь в похудении/наборе массы</li>
                <li>3. Составление программы питания</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-6 relative overflow-hidden flex-1 transition-all duration-300">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div
                className="absolute right-[-10%] top-[-10%] w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full blur-[100px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(178, 220, 118, 0.25), transparent 70%)" }}
              />

              <div className="absolute right-0 bottom-0 w-[130px] h-[160px] md:w-[160px] md:h-[180px] lg:w-[180px] lg:h-[200px] pointer-events-none z-0">
                <img
                  src="./images/box.png"
                  alt="Тренировки по боксу"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 lg:mb-6 text-balance max-w-[60%] lg:max-w-full lg:whitespace-nowrap">
                  Тренировки <span className="text-[#b2dc76]">по боксу</span>
                </h3>

                <select
                  value={boxingSessions}
                  onChange={(e) => setBoxingSessions(e.target.value)}
                  className="w-full max-w-[200px] md:max-w-[220px] bg-[#1A2228] text-white px-3 md:px-4 py-2 rounded-lg text-sm border-0 mb-3 md:mb-4 cursor-pointer hover:bg-[#242C34] transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCw2IEw4LDEwIEwxMiw2IiBzdHJva2U9IiNiMmRjNzYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                >
                  {["3", "5", "8", "10", "12"].map((option) => (
                    <option key={option} value={option}>
                      {option} тренировок
                    </option>
                  ))}
                </select>

                <div className="mb-3 md:mb-4">
                  <p className="text-sm text-[#A1A7A4] mb-1">ОТ</p>
                  <p className="text-3xl md:text-4xl font-semibold text-white">{getBoxingPrice()}</p>
                </div>

                <a
                  href={generateTelegramUrl("Тренировки по боксу", boxingSessions)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] inline-block text-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40 bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black"
                >
                  Оформить
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-6 relative overflow-hidden flex-1 transition-all duration-300">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div
                className="absolute right-[-10%] bottom-[-10%] w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full blur-[100px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(178, 220, 118, 0.25), transparent 70%)" }}
              />

              <div className="absolute right-0 bottom-0 w-[130px] h-[160px] md:w-[160px] md:h-[180px] lg:w-[180px] lg:h-[200px] pointer-events-none z-0">
                <img
                  src="./images/functional.png"
                  alt="Функциональные тренировки"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 lg:mb-6 text-balance max-w-[60%] lg:max-w-full lg:whitespace-nowrap">
                  <span className="text-[#b2dc76]">Функциональные</span> тренировки
                </h3>

                <select
                  value={functionalSessions}
                  onChange={(e) => setFunctionalSessions(e.target.value)}
                  className="w-full max-w-[200px] md:max-w-[220px] bg-[#1A2228] text-white px-3 md:px-4 py-2 rounded-lg text-sm border-0 mb-3 md:mb-4 cursor-pointer hover:bg-[#242C34] transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCw2IEw4LDEwIEwxMiw2IiBzdHJva2U9IiNiMmRjNzYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                >
                  {["3", "5", "8", "10", "12"].map((option) => (
                    <option key={option} value={option}>
                      {option} тренировок
                    </option>
                  ))}
                </select>

                <div className="mb-3 md:mb-4">
                  <p className="text-sm text-[#A1A7A4] mb-1">ОТ</p>
                  <p className="text-3xl md:text-4xl font-semibold text-white">{getFunctionalPrice()}</p>
                </div>

                <a
                  href={generateTelegramUrl("Функциональные тренировки", functionalSessions)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] md:max-w-[260px] inline-block text-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold md:whitespace-nowrap transition-all shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40 bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black"
                >
                  Оформить
                </a>
              </div>
            </div>
          </div>

          <div className="lg:hidden bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-6 transition-all duration-300">
            <h4 className="text-xl font-semibold text-white mb-3">Преимущества всех тренировок</h4>
            <ul className="space-y-2 text-sm text-[#D1D5DB]">
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
