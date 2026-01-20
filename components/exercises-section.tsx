"use client"

import { useState } from "react"
import { Dumbbell } from "lucide-react"
import { ExerciseModal } from "./exercise-modal"

type MuscleGroup = "chest" | "legs" | "back" | "arms" | "shoulders" | "glutes" | "abs" | "warmup"
type GoalType = "weight" | "endurance" | "boxing" | null

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

interface GoalVideo {
  id: string
  title: string
  videoUrl: string
  description: string
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
    {
      id: "ex1",
      title: "Сведение рук в тренажёре «бабочка»",
      muscle: "на грудь",
      level: "Новичкам",
      videoThumb: "/images/exercise-chest-3.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908776/1_yjkidv.mp4",
      goal: "Изоляция и формирование грудных мышц",
      steps: [
        "Сядьте в тренажёр, спина плотно прижата",
        "Возьмитесь за рукояти",
        "На выдохе сведите руки перед собой",
        "В верхней точке задержитесь на секунду",
        "Медленно разведите руки назад",
      ],
      important: ["Не выпрямляйте локти полностью", "Движение плавное, без рывков"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex2",
      title: "Сведение рук в кроссовере стоя",
      muscle: "на грудь",
      level: "Новичкам",
      videoThumb: "/images/exercise-chest-4.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908774/2_fsajd0.mp4",
      goal: "Проработка внутренней части груди",
      steps: [
        "Встаньте между блоками",
        "Возьмитесь за рукояти, корпус слегка наклонён",
        "Сведите руки перед собой",
        "Медленно вернитесь в исходное положение",
      ],
      important: ["Грудь раскрыта", "Локти слегка согнуты"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex3",
      title: "Жим гантелей на наклонной скамье 45°",
      muscle: "на грудь",
      level: "Новичкам",
      videoThumb: "/images/exercise-chest-5.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908769/3_xwxbmb.mp4",
      goal: "Развитие верхней части грудных мышц",
      steps: [
        "Лягте на наклонную скамью",
        "Гантели на уровне груди",
        "Выжмите гантели вверх",
        "Медленно опустите вниз",
      ],
      important: ["Не сводите гантели резко", "Контролируйте движение"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  legs: [
    {
      id: "ex11",
      title: "Разгибание ног в тренажёре",
      muscle: "на ноги",
      level: "Новичкам",
      videoThumb: "/images/exercise-legs-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908773/11_q42gdw.mp4",
      goal: "Изоляция квадрицепсов",
      steps: [
        "Сядьте в тренажёр",
        "Разогните ноги вверх",
        "Медленно опустите",
      ],
      important: ["Не бросайте вес", "Контроль внизу"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex12",
      title: "Приседание сумо с гирей",
      muscle: "на ноги",
      level: "Новичкам",
      videoThumb: "/images/exercise-legs-2.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908771/12_dkac0c.mp4",
      goal: "Внутренняя поверхность бедра и ягодицы",
      steps: [
        "Ноги широко, носки в стороны",
        "Держите гирю двумя руками",
        "Присядьте вниз",
        "Вернитесь вверх",
      ],
      important: ["Спина ровная", "Колени в сторону носков"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex13",
      title: "Сгибание ног в тренажёре",
      muscle: "на ноги",
      level: "Новичкам",
      videoThumb: "/images/exercise-legs-3.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908772/13_z26wnx.mp4",
      goal: "Развитие задней поверхности бедра",
      steps: [
        "Лягте или сядьте в тренажёр",
        "Согните ноги",
        "Медленно опустите",
      ],
      important: ["Без рывков", "Полная амплитуда"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
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
    {
      id: "6",
      title: "Подъем гантели к поясу в наклоне",
      muscle: "на спину",
      level: "Новичкам",
      videoThumb: "/images/exercise-arms-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768484215/6_nbosg3.mp4",
      goal: "Развитие широчайших мышц спины, увеличение толщины и силы спины",
      steps: [
        "Возьмите гантель в одну руку",
        "Наклоните корпус вперёд, спина ровная",
        "Свободной рукой упритесь в скамью или колено",
        "Потяните гантель к поясу, ведя локоть назад",
        "В верхней точке сведите лопатку",
        "Медленно опустите гантель вниз",
        "Выполните нужное количество повторений и смените руку",
      ],
      important: ["Спина остаётся прямой на протяжении всего движения", "Тяните локтем, а не кистью"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex5",
      title: "Гиперэкстензия",
      muscle: "на спину",
      level: "Новичкам",
      videoThumb: "/images/exercise-back-5.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908772/5_mqicbb.mp4",
      goal: "Укрепление поясницы и мышц-разгибателей спины",
      steps: [
        "Зафиксируйте ноги в тренажёре",
        "Опустите корпус вниз",
        "Поднимитесь до прямой линии тела",
      ],
      important: ["Не переразгибайтесь", "Спина ровная"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex10",
      title: "Разведение в тренажёре «бабочка» (обратное)",
      muscle: "на спину",
      level: "Новичкам",
      videoThumb: "/images/exercise-back-6.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908776/10_icka33.mp4",
      goal: "Задние дельты и верх спины",
      steps: [
        "Сядьте лицом к спинке",
        "Возьмитесь за рукояти",
        "Разведите руки в стороны",
        "Медленно вернитесь",
      ],
      important: ["Не тяните трапециями", "Движение плавное"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  arms: [
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
        "Лягте на скамью, стопы на полу",
        "Возьмите штангу хватом чуть шире плеч",
        "Опустите штангу к середине груди",
        "Выжмите вверх до полного выпрямления рук",
      ],
      important: ["Лопатки сведены", "Не отбивайте штангу от груди"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex6",
      title: "«Боковые подъёмы» в тренажёре",
      muscle: "на плечи",
      level: "Новичкам",
      videoThumb: "/images/exercise-shoulders-2.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908769/6_oqk4ej.mp4",
      goal: "Развитие средних дельт",
      steps: [
        "Сядьте в тренажёр",
        "Возьмитесь за рукояти",
        "Поднимите руки в стороны",
        "Медленно опустите",
      ],
      important: ["Без рывков", "Постоянное напряжение"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex7",
      title: "Разведение гантелей стоя в стороны",
      muscle: "на плечи",
      level: "Новичкам",
      videoThumb: "/images/exercise-shoulders-3.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908771/7_pmpepv.mp4",
      goal: "Форма и ширина плеч",
      steps: [
        "Встаньте ровно, гантели по бокам",
        "Поднимите руки в стороны до уровня плеч",
        "Медленно опустите",
      ],
      important: ["Локти слегка согнуты", "Не раскачивайтесь"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex8",
      title: "Подъём гантелей перед собой стоя",
      muscle: "на плечи",
      level: "Новичкам",
      videoThumb: "/images/exercise-shoulders-4.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908775/8_hjjm8t.mp4",
      goal: "Развитие передней дельты",
      steps: [
        "Гантели перед бедрами",
        "Поднимите гантели до уровня плеч",
        "Медленно опустите",
      ],
      important: ["Контроль движения", "Без рывков"],
      suitable: ["Начинающим", "Средний уровень"],
    },
    {
      id: "ex9",
      title: "Жим сидя в тренажёре Смита",
      muscle: "на плечи",
      level: "Новичкам",
      videoThumb: "/images/exercise-shoulders-5.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908769/9_eqvkoh.mp4",
      goal: "Сила и масса плеч",
      steps: [
        "Сядьте под штангу",
        "Опустите гриф к уровню подбородка",
        "Выжмите вверх",
        "Верните вниз",
      ],
      important: ["Спина прижата", "Не блокируйте локти"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  glutes: [],
  abs: [
    {
      id: "ex4",
      title: "Подъём ног в упоре",
      muscle: "на пресс",
      level: "Новичкам",
      videoThumb: "/images/exercise-abs-1.jpg",
      videoUrl: "https://res.cloudinary.com/dz2ksvggk/video/upload/v1768908769/4_xfmn6x.mp4",
      goal: "Укрепление нижнего пресса",
      steps: [
        "Встаньте в упор на локтях",
        "Поднимите ноги вверх",
        "Медленно опустите вниз",
      ],
      important: ["Не раскачивайтесь", "Работает пресс, не поясница"],
      suitable: ["Начинающим", "Средний уровень"],
    },
  ],
  warmup: [],
}

const goalVideos: Record<string, GoalVideo[]> = {
  endurance: [],
  boxing: [],
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

interface ExercisesSectionProps {
  onModalChange?: (isOpen: boolean) => void
}

export function ExercisesSection({ onModalChange }: ExercisesSectionProps) {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>("weight")
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>("arms")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [selectedGoalVideo, setSelectedGoalVideo] = useState<GoalVideo | null>(null)

  const currentExercises = exercises[selectedMuscle]
  const hasExercises = currentExercises.length > 0
  const showMuscleGroups = selectedGoal === "weight"
  const currentGoalVideos = selectedGoal && selectedGoal !== "weight" ? goalVideos[selectedGoal] || [] : []

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
    setSelectedGoalVideo(null)
    onModalChange?.(false)
  }

  return (
    <section id="exercises" className="py-8 px-4 md:px-6 relative z-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-12 text-center">
          Выберите себя — <span className="text-[#b2dc76]">получите упражнения</span>
        </h2>

        {/* Goal filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setSelectedGoal("weight")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
              selectedGoal === "weight"
                ? "bg-gradient-to-r from-[#1a2d1a] to-[#0f1a0f] border-2 border-[#b2dc76] text-white"
                : "bg-gradient-to-r from-[#1a2d1a]/40 to-[#0f1a0f]/40 border border-[#2d4a2d]/30 text-gray-400 hover:text-white hover:border-[#b2dc76]/50"
            }`}
          >
            <span className="text-base">Сбросить/Набрать вес</span>
          </button>
          <button
            onClick={() => setSelectedGoal("endurance")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
              selectedGoal === "endurance"
                ? "bg-gradient-to-r from-[#1a2d1a] to-[#0f1a0f] border-2 border-[#b2dc76] text-white"
                : "bg-gradient-to-r from-[#1a2d1a]/40 to-[#0f1a0f]/40 border border-[#2d4a2d]/30 text-gray-400 hover:text-white hover:border-[#b2dc76]/50"
            }`}
          >
            <span className="text-base">Улучшить выносливость</span>
          </button>
          <button
            onClick={() => setSelectedGoal("boxing")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
              selectedGoal === "boxing"
                ? "bg-gradient-to-r from-[#1a2d1a] to-[#0f1a0f] border-2 border-[#b2dc76] text-white"
                : "bg-gradient-to-r from-[#1a2d1a]/40 to-[#0f1a0f]/40 border border-[#2d4a2d]/30 text-gray-400 hover:text-white hover:border-[#b2dc76]/50"
            }`}
          >
            <span className="text-base">Поставить удар</span>
          </button>
        </div>

        {/* Muscle group buttons - only show for weight goal */}
        {showMuscleGroups && (
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
        )}

        {/* Goal videos for endurance and boxing */}
        {!showMuscleGroups && currentGoalVideos.length === 0 && (
          <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-12 text-center mb-8">
            <p className="text-2xl text-gray-400 font-medium">Упражнений пока нет...</p>
          </div>
        )}
        {!showMuscleGroups && currentGoalVideos.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {currentGoalVideos.map((video) => (
              <div
                key={video.id}
                className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6"
              >
                {/* Video */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-4">
                  <video
                    src={`${video.videoUrl}#t=0.1`}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                  />
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{video.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{video.description}</p>

                <button
                  onClick={() => {
                    setSelectedGoalVideo(video)
                    onModalChange?.(true)
                  }}
                  className="w-full px-4 py-2 rounded-lg font-medium text-sm transition-all bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black"
                >
                  Смотреть видео
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main exercise card - only show for weight goal */}
        {showMuscleGroups && !hasExercises ? (
          <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-3xl p-12 text-center mb-8">
            <p className="text-2xl text-gray-400 font-medium">Упражнений пока нет...</p>
          </div>
        ) : showMuscleGroups && hasExercises ? (
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
                      style={
                        exercise.id === "9" || exercise.id === "ex12"
                          ? { objectPosition: "center 20%" }
                          : exercise.id === "ex13"
                            ? { objectPosition: "center 70%" }
                            : undefined
                      }
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
        ) : null}

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

      {/* Exercise Modal */}
      {selectedExercise && (
        <ExerciseModal isOpen={!!selectedExercise} onClose={handleCloseModal} exercise={selectedExercise} />
      )}

      {/* Goal Video Modal */}
      {selectedGoalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4 bg-gradient-to-br from-[#1a2d1a] to-[#0f1a0f] rounded-3xl border-2 border-[#2d4a2d] p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-white mb-4">{selectedGoalVideo.title}</h3>
            
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <video
                src={selectedGoalVideo.videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>

            <p className="text-lg text-gray-300">{selectedGoalVideo.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}
