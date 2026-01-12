"use client"

import { useState } from "react"
import { Dumbbell } from "lucide-react"
import { ExerciseModal } from "./exercise-modal"

type MuscleGroup = "chest" | "legs" | "back" | "arms" | "shoulders" | "glutes" | "abs" | "warmup"

interface Exercise {
  id: string
  title: string
  muscle: string
  level: string
  videoThumb: string
  videoUrl?: string
  goal: string
  steps: string[]
  important: string[]
  suitable: string[]
}

const exercises: Record<MuscleGroup, Exercise[]> = {
  chest: [],
  legs: [],
  back: [],
  arms: [
    {
      id: "12",
      title: "Молотки",
      muscle: "на бицепс и предплечья",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-3.jpg",
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/molotki-I6GQOaXfeNS5j1PYWgSWXhxOi3vkTi.mp4",
      goal: "Рост и форма бицепса без нагрузки на локти",
      steps: [
        "Руки вдоль тела",
        "Сгибайте в локте, не разворачивая кисти",
        "Поднимите гантели до уровня плеча",
        "Медленно опустите вниз",
      ],
      important: ["Локти прижаты к корпусу, без раскачки.", "Тренируйтесь размеренно, без рывков."],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  shoulders: [],
  glutes: [],
  abs: [],
  warmup: [],
}

const muscleGroups = [
  { id: "chest" as MuscleGroup, label: "Грудь", icon: Dumbbell },
  { id: "legs" as MuscleGroup, label: "Ноги", icon: Dumbbell },
  { id: "back" as MuscleGroup, label: "Спина", icon: Dumbbell },
  { id: "arms" as MuscleGroup, label: "Руки", icon: Dumbbell },
  { id: "shoulders" as MuscleGroup, label: "Дельты", icon: Dumbbell },
  { id: "glutes" as MuscleGroup, label: "Ягодицы", icon: Dumbbell },
  { id: "abs" as MuscleGroup, label: "Пресс", icon: Dumbbell },
  { id: "warmup" as MuscleGroup, label: "Разминка", icon: Dumbbell },
]

export function ExercisesSection() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>("arms")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const currentExercises = exercises[selectedMuscle]
  const hasExercises = currentExercises.length > 0

  const handleTelegramClick = () => {
    const message = "Здравствуйте, хочу записаться на пробную тренировку!"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/+79194498792?text=${encodedMessage}`, "_blank")
  }

  return (
    <section id="exercises" className="py-8 px-4 md:px-6 relative z-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-12 text-center">
          Выберите мышцу — <span className="text-[#b2dc76]">получите упражнения</span>
        </h2>

        {/* Muscle group buttons */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {muscleGroups.map((group) => {
            const Icon = group.icon
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedMuscle(group.id)
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                  selectedMuscle === group.id
                    ? "bg-gradient-to-r from-[#1a2d1a] to-[#0f1a0f] border-2 border-[#b2dc76] text-white"
                    : "bg-gradient-to-r from-[#1a2d1a]/40 to-[#0f1a0f]/40 border border-[#2d4a2d]/30 text-gray-400 hover:text-white hover:border-[#b2dc76]/50"
                }`}
              >
                <Icon className={`w-5 h-5 ${selectedMuscle === group.id ? "text-[#b2dc76]" : ""}`} />
                <span className="text-sm">{group.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main exercise card */}
        {!hasExercises ? (
          <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-12 text-center mb-8">
            <p className="text-2xl text-gray-400 font-medium">Упражнений пока нет...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {currentExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6"
              >
                {/* Exercise video/image */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-4">
                  {exercise.videoUrl ? (
                    <video src={exercise.videoUrl} className="w-full h-full object-cover" preload="metadata" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#b2dc76]/20 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-6 border-t-transparent border-l-8 border-l-[#b2dc76] border-b-6 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{exercise.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{exercise.muscle}</p>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#b2dc76]/20 text-[#b2dc76] text-xs font-medium">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {exercise.level}
                  </span>

                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="px-4 py-2 rounded-lg font-medium text-sm transition-all bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Telegram contact button */}
        <div className="flex justify-center">
          <button
            onClick={handleTelegramClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-sans text-lg font-semibold transition-all hover:brightness-110 hover:-translate-y-0.5 bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40"
          >
            <img src="/images/telegram-logo.webp" alt="Telegram" className="w-6 h-6" />
            Связаться с тренером
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedExercise && (
        <ExerciseModal
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          exercise={selectedExercise}
        />
      )}
    </section>
  )
}
