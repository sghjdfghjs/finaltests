"use client"

import { Shield, Target, BookOpen, TrendingUp, Dumbbell, Users } from "lucide-react"

export function AboutSection() {
  const handleTelegramClick = () => {
    const message = "Здравствуйте, хочу записаться на пробную тренировку!"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/+79194498792?text=${encodedMessage}`, "_blank")
  }

  return (
    <section id="about" className="py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Обо <span className="text-[#b2dc76]">мне</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            <span className="font-semibold text-white">Директор строительной компании,</span>
            <br />
            <span className="text-gray-400">для которого </span>
            <span className="text-white font-medium">спорт — образ жизни и профессия</span>
          </p>
        </div>

        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left column - Text content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Кто <span className="text-[#b2dc76]">я</span>
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">Меня зовут Ян Жеребной.</p>
                <p className="text-gray-400 leading-relaxed">
                  С 2011 года я руковожу производственно-строительной компанией, а спорт более 10 лет является
                  неотъемлемой частью моей жизни.
                </p>
              </div>

              <p className="text-gray-400 leading-relaxed">
                Силовые тренировки, кроссфит и бокс из хобби выросли в{" "}
                <span className="text-white font-medium">профессию</span>. Пройдя профильное обучение и сертификацию,
                сегодня я помогаю людям безопасно и эффективно приходить в форму и улучшать качество жизни.
              </p>
            </div>

            {/* Right column - Vertical badge stack */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#1a2d1a]/90 to-[#0f1a0f]/90 backdrop-blur-md border border-[#2d4a2d]/50 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-6 h-6 text-[#b2dc76]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Более 10 лет в спорте</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a2d1a]/90 to-[#0f1a0f]/90 backdrop-blur-md border border-[#2d4a2d]/50 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#b2dc76]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Сертифицированный тренер</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a2d1a]/90 to-[#0f1a0f]/90 backdrop-blur-md border border-[#2d4a2d]/50 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center justify-center">
                  <p className="text-[#b2dc76] font-bold text-2xl tracking-wider">XFIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What I work with */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
            С чем я <span className="text-[#b2dc76]">работаю</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all hover:shadow-xl hover:shadow-[#b2dc76]/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <Dumbbell className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Функциональный</h4>
                  <h4 className="text-xl font-bold text-white">тренинг</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Сила, выносливость и мобильность без перегрузок и травм. Подходит для любого уровня подготовки.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all hover:shadow-xl hover:shadow-[#b2dc76]/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Бокс</h4>
                  <h4 className="text-xl font-bold text-white">для начинающих</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Техника, скорость и координация. Постановка удара, защита, работа ног и корпуса.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all hover:shadow-xl hover:shadow-[#b2dc76]/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Кроссфит</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Функциональные тренировки для реальной силы и выносливости, адаптированные под ваш уровень.
              </p>
            </div>
          </div>
        </div>

        {/* Why trust me */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Почему мне <span className="text-[#b2dc76]">можно доверять</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Безопасность —</h4>
                  <h4 className="text-xl font-bold text-white">приоритет №1</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Я обучаю правильной технике и контролирую каждое движение, чтобы минимизировать риск травм, проблем со
                спиной и суставами.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Индивидуальный подход</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Никаких шаблонных программ. Тренировки строятся под ваши цели, возраст, график и уровень физической
                подготовки.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Системные знания и образование</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Я объясняю, зачем мы выполняем каждое упражнение, какие мышцы работают и как это приближает вас к
                результату.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a2d1a]/40 to-[#0f1a0f]/40 backdrop-blur-sm border border-[#2d4a2d]/30 rounded-2xl p-6 hover:border-[#b2dc76]/50 transition-all">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#b2dc76]/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#b2dc76]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Работаю на ваш результат</h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Моя мотивация — Ваш прогресс. Ваши изменения — лучшая рекомендация и мой профессиональный успех.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section - Education and Location */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Образование и сертификаты</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b2dc76] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-300 leading-relaxed">Фитнес-инструктор индивидуальных и групповых программ</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b2dc76] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-300 leading-relaxed">Тренер по боксу и кикбоксингу</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b2dc76] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-300 leading-relaxed">Сертифицированный специалист</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b2dc76] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-300 leading-relaxed">Многолетний практический опыт и личный пример</p>
              </div>
            </div>
          </div>

          {/* Location & CTA */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Где проходят тренировки</h3>
            <div className="flex items-start gap-3 mb-6">
              <svg className="w-5 h-5 text-[#b2dc76] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-white font-semibold">Фитнес-клуб XFIT</p>
                <p className="text-gray-400 text-sm">ул. Газета Звезда, 46 ст.1</p>
              </div>
            </div>

            <button
              onClick={handleTelegramClick}
              className="w-full bg-gradient-to-r from-[#b2dc76] to-[#8fbd4f] hover:from-[#8fbd4f] hover:to-[#7aa63d] text-black font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-[#b2dc76]/20 hover:shadow-[#b2dc76]/40"
            >
              Записаться на пробную тренировку
              <div className="text-xs font-normal mt-1 opacity-90">Первая консультация бесплатно</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
