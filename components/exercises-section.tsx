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
  chest: [
    {
      id: "2",
      title: "Жим штанги лежа на горизонтальной скамье",
      muscle: "на грудь",
      level: "Новичкам",
      videoThumb: "/images/exercise-chest-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484215/2_k0gj7z.mp4",
      goal: "Рост силы и массы грудных мышц",
      steps: [
        "Лягте на скамью, стопы на полу",
        "Возьмите штангу хватом чуть шире плеч",
        "Опустите штангу к середине груди",
        "Выжмите вверх до полного выпрямления рук",
      ],
      important: ["Лопатки сведены", "Не отбивайте штангу от груди"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "13",
      title: "Отжимания на брусьях",
      muscle: "на грудь",
      level: "Новичкам",
      videoThumb: "/images/exercise-chest-2.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484212/13_ywvnrd.mp4",
      goal: "Нижняя часть груди и трицепс",
      steps: ["Возьмитесь за брусья", "Наклоните корпус вперед", "Опуститесь до параллели", "Выжмите себя вверх"],
      important: ["Контролируйте глубину", "Без рывков"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  legs: [],
  back: [
    {
      id: "3",
      title: "Горизонтальная тяга блока узким хватом",
      muscle: "на спину",
      level: "Новичкам",
      videoThumb: "/images/exercise-back-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484214/3_fhi4be.mp4",
      goal: "Толщина и детализация спины",
      steps: [
        "Сядьте к тренажеру, спина прямая",
        "Возьмитесь за рукоять узким хватом",
        "Потяните рукоять к животу",
        "Медленно вернитесь в исходное положение",
      ],
      important: ["Тяните спиной, а не руками", "Не округляйте поясницу"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "4",
      title: "Вертикальная тяга блока к груди",
      muscle: "на спину",
      level: "Новичкам",
      videoThumb: "/images/exercise-back-2.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484212/4_xxx19y.mp4",
      goal: "Развитие широчайших мышц",
      steps: [
        "Возьмитесь за перекладину широким хватом",
        "Потяните блок к верхней части груди",
        "Сведите лопатки",
        "Медленно отпустите вверх",
      ],
      important: ["Не отклоняйтесь сильно назад", "Контролируйте движение"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "5",
      title: "Подтягивания параллельным хватом",
      muscle: "на спину",
      level: "Средний",
      videoThumb: "/images/exercise-back-3.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484212/5_nvwigq.mp4",
      goal: "Сила и объем спины и рук",
      steps: ["Возьмитесь за параллельные рукояти", "Подтянитесь до уровня груди", "Медленно опуститесь вниз"],
      important: ["Без рывков", "Полная амплитуда движения"],
      suitable: ["Средний уровень", "Продвинутым"],
    },
    {
      id: "8",
      title: "Подтягивания с отягощением широким хватом",
      muscle: "на спину",
      level: "Продвинутым",
      videoThumb: "/images/exercise-back-4.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484215/8_rzvm5z.mp4",
      goal: "Максимальный рост ширины спины",
      steps: [
        "Закрепите дополнительный вес",
        "Возьмитесь широким хватом",
        "Подтянитесь до уровня груди",
        "Медленно опуститесь",
      ],
      important: ["Без рывков", "Полный контроль движения"],
      suitable: ["Продвинутым"],
    },
  ],
  arms: [
    {
      id: "6",
      title: "Разгибание руки с гантелью в наклоне",
      muscle: "на трицепс",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484215/6_nbosg3.mp4",
      goal: "Изоляция и форма трицепса",
      steps: [
        "Наклонитесь вперед, спина ровная",
        "Локоть прижат к корпусу",
        "Разогните руку назад",
        "Вернитесь в исходное положение",
      ],
      important: ["Работает только предплечье", "Без раскачки"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "9",
      title: "Подъем штанги стоя на бицепс",
      muscle: "на бицепс",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-2.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484215/9_hyfo4b.mp4",
      goal: "Масса и сила бицепса",
      steps: [
        "Возьмите штангу хватом снизу",
        "Локти прижаты к корпусу",
        "Поднимите штангу к груди",
        "Медленно опустите",
      ],
      important: ["Не раскачивайтесь", "Работают только руки"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "11",
      title: "Обратные отжимания",
      muscle: "на трицепс",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-5.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484212/11_vffgoh.mp4",
      goal: "Сила и объем трицепса",
      steps: ["Упритесь руками в скамью", "Опускайтесь, сгибая локти", "Выжмите тело вверх"],
      important: ["Локти назад", "Не опускайтесь слишком низко"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "12",
      title: "Молотки",
      muscle: "на бицепс и предплечья",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-3.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484912/molotkii_wkrrvn.mp4",
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
    {
      id: "14",
      title: "Разгибание рук в блоке стоя",
      muscle: "на трицепс",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-6.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484212/12_epckk0.mp4",
      goal: "Изоляция трицепса",
      steps: ["Возьмитесь за рукоять блока", "Локти прижаты к телу", "Разогните руки вниз", "Медленно вернитесь"],
      important: ["Без раскачки", "Постоянное напряжение"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  shoulders: [
    {
      id: "1",
      title: "Тяга штанги к подбородку",
      muscle: "на плечи",
      level: "Новичкам",
      videoThumb: "/images/exercise-shoulders-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484212/1_dg7hfr.mp4",
      goal: "Развитие средних дельт и трапеций",
      steps: [
        "Возьмите штангу хватом чуть уже плеч",
        "Штанга у бедер, спина прямая",
        "Тяните штангу вверх вдоль тела",
        "Поднимите до уровня подбородка",
        "Медленно опустите вниз",
      ],
      important: ["Локти всегда выше кистей", "Не раскачивайтесь корпусом"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  glutes: [],
  abs: [],
  warmup: [],
}

interface ExercisesSectionProps {
  onModalChange?: (isOpen: boolean) => void
}

export function ExercisesSection({ onModalChange }: ExercisesSectionProps) {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>("arms")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const currentExercises = exercises[selectedMuscle]
  const hasExercises = currentExercises.length > 0

  const handleTelegramClick = () => {
    const message = "Здравствуйте, хочу записаться на пробную тренировку!"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/+79194498792?text=${encodedMessage}`, "_blank")
  }

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    onModalChange?.(true)
  }

  const handleCloseModal = () => {
    setSelectedExercise(null)
    onModalChange?.(false)
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
                    <video
                      src={`${exercise.videoUrl}#t=0.1`}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      playsInline
                      muted
                    />
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
                    onClick={() => handleExerciseClick(exercise)}
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
        <ExerciseModal isOpen={!!selectedExercise} onClose={handleCloseModal} exercise={selectedExercise} />
      )}
    </section>
  )
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
