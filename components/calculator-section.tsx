"use client"

import { useState } from "react"
import Image from "next/image"
import { getImagePath } from "@/lib/image-path"

export function CalculatorSection() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null)
  const [step, setStep] = useState(1)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(25)
  const [activityLevel, setActivityLevel] = useState<number | null>(null)
  const [goal, setGoal] = useState<"loss" | "gain" | null>(null)
  const [results, setResults] = useState<{
    calories: number
    protein: number
    fats: number
    carbs: number
  } | null>(null)

  const calculateKBZHU = () => {
    let bmr: number
    if (selectedGender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    const dailyCalories = bmr * (activityLevel || 1.2)

    let targetCalories: number
    let protein: number
    let fats: number
    let carbs: number

    if (goal === "gain") {
      targetCalories = dailyCalories * 1.125
      protein = 1.9 * weight
      fats = 0.95 * weight
      carbs = (targetCalories - (protein * 4 + fats * 9)) / 4
    } else {
      targetCalories = dailyCalories * 0.825
      protein = 2 * weight
      fats = 0.8 * weight
      carbs = (targetCalories - (protein * 4 + fats * 9)) / 4
    }

    setResults({
      calories: Math.round(targetCalories),
      protein: Math.round(protein),
      fats: Math.round(fats),
      carbs: Math.round(carbs),
    })
  }

  const activityOptions = [
    { value: 1.2, label: "Нет тренировок", description: "Сидячий образ жизни" },
    { value: 1.375, label: "1-3 раза/нед", description: "Легкая активность" },
    { value: 1.55, label: "3-5 раз/нед", description: "Средняя активность" },
    { value: 1.725, label: "6-7 раз/нед", description: "Высокая активность" },
    { value: 1.9, label: "Очень высокая", description: "Экстремальная активность" },
  ]

  return (
    <section id="calculator" className="py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground">Калькулятор КБЖУ</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Рассчитайте вашу норму калорий, белков, жиров и углеводов
          </p>
        </div>

        {selectedGender && !results && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-card h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">Шаг {step}/4</p>
          </div>
        )}

        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => {
                setSelectedGender("male")
                setStep(2)
              }}
              className={`p-6 bg-card rounded-3xl border-2 transition-all duration-300 hover:shadow-md ${
                selectedGender === "male" ? "border-primary shadow-lg scale-105" : "border-border"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={getImagePath("/images/man-1f468.png") || "/placeholder.svg"}
                  alt="Мужчина"
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
                <span className="text-lg font-normal text-foreground">Я мужчина</span>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedGender("female")
                setStep(2)
              }}
              className={`p-6 bg-card rounded-3xl border-2 transition-all duration-300 hover:shadow-md ${
                selectedGender === "female" ? "border-primary shadow-lg scale-105" : "border-border"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={getImagePath("/images/woman-1f469.png") || "/placeholder.svg"}
                  alt="Женщина"
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
                <span className="text-lg font-normal text-foreground">Я женщина</span>
              </div>
            </button>
          </div>
        )}

        {step === 2 && selectedGender && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-3xl p-8 border-2 border-border">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-40 h-56">
                  <Image
                    src={
                      selectedGender === "male"
                        ? getImagePath("/images/man-standing-1f9cd-200d-2642-fe0f.png")
                        : getImagePath("/images/woman-standing-1f9cd-200d-2640-fe0f.png")
                    }
                    alt="Person"
                    width={120}
                    height={180}
                    className="transition-transform duration-150"
                    style={{
                      transform: `scale(${1 + (weight - 70) * 0.003}, ${1 + (height - 170) * 0.002})`,
                    }}
                  />
                </div>

                <div className="flex-1 w-full space-y-6">
                  <div>
                    <label className="block text-sm font-normal text-foreground mb-2">Вес: {weight} кг</label>
                    <input
                      type="range"
                      min="40"
                      max="150"
                      value={weight}
                      onInput={(e) => setWeight(Number(e.currentTarget.value))}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-foreground mb-2">Рост: {height} см</label>
                    <input
                      type="range"
                      min="140"
                      max="220"
                      value={height}
                      onInput={(e) => setHeight(Number(e.currentTarget.value))}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-foreground mb-2">Возраст: {age} лет</label>
                    <input
                      type="range"
                      min="15"
                      max="80"
                      value={age}
                      onInput={(e) => setAge(Number(e.currentTarget.value))}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider"
                    />
                  </div>

                  <button
                    onClick={() => setStep(3)}
                    className="bg-primary px-6 py-2 font-sans text-base font-normal text-primary-foreground transition-all hover:bg-primary/90 rounded-lg"
                  >
                    Далее
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedGender && (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-normal text-foreground mb-4 text-center">Уровень физической активности</h3>
            <div className="space-y-3">
              {activityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setActivityLevel(option.value)
                    setStep(4)
                  }}
                  className="w-full p-5 bg-card rounded-3xl border-2 border-border transition-all duration-300 text-left hover:shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-base font-medium text-foreground">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <span className="text-sm text-primary font-medium">×{option.value}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && selectedGender && activityLevel && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-normal text-foreground mb-4 text-center">Ваша цель</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setGoal("loss")
                  calculateKBZHU()
                }}
                className="p-8 bg-card rounded-3xl border-2 border-border transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">⬇️</span>
                  <span className="text-lg font-normal text-foreground">Похудение</span>
                  <span className="text-sm text-muted-foreground font-light">Дефицит калорий</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setGoal("gain")
                  calculateKBZHU()
                }}
                className="p-8 bg-card rounded-3xl border-2 border-border transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">⬆️</span>
                  <span className="text-lg font-normal text-foreground">Набор массы</span>
                  <span className="text-sm text-muted-foreground font-light">Профицит калорий</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {results && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-3xl p-8 border-2 border-primary/20">
              <h3 className="text-2xl font-medium text-foreground mb-6 text-center">Ваши результаты</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background rounded-2xl p-6 text-center border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Калории</p>
                  <p className="text-4xl font-semibold text-primary">{results.calories}</p>
                  <p className="text-xs text-muted-foreground mt-1">ккал/день</p>
                </div>
                <div className="bg-background rounded-2xl p-6 text-center border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Белки</p>
                  <p className="text-4xl font-semibold text-primary">{results.protein}</p>
                  <p className="text-xs text-muted-foreground mt-1">г/день</p>
                </div>
                <div className="bg-background rounded-2xl p-6 text-center border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Жиры</p>
                  <p className="text-4xl font-semibold text-primary">{results.fats}</p>
                  <p className="text-xs text-muted-foreground mt-1">г/день</p>
                </div>
                <div className="bg-background rounded-2xl p-6 text-center border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Углеводы</p>
                  <p className="text-4xl font-semibold text-primary">{results.carbs}</p>
                  <p className="text-xs text-muted-foreground mt-1">г/день</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setStep(1)
                    setSelectedGender(null)
                    setResults(null)
                    setActivityLevel(null)
                    setGoal(null)
                  }}
                  className="bg-primary px-8 py-2 font-sans text-base font-normal text-primary-foreground transition-all hover:bg-primary/90 rounded-lg"
                >
                  Рассчитать заново
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: hsl(var(--primary));
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: hsl(var(--primary));
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}
