"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollPosition = 0
    const scrollSpeed = 0.5 // пикселей в миллисекунду
    let animationId: number

    const autoScroll = () => {
      if (carousel) {
        scrollPosition += scrollSpeed

        // Если достигли конца, возвращаемся к началу
        if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
          scrollPosition = 0
        }

        carousel.scrollLeft = scrollPosition
        animationId = requestAnimationFrame(autoScroll)
      }
    }

    // Запускаем автопрокрутку
    animationId = requestAnimationFrame(autoScroll)

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      // Останавливаем автопрокрутку при взаимодействии
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      isDown = false
      // Возобновляем автопрокрутку
      scrollPosition = carousel.scrollLeft
      animationId = requestAnimationFrame(autoScroll)
    }

    const handleMouseUp = () => {
      isDown = false
      // Возобновляем автопрокрутку
      scrollPosition = carousel.scrollLeft
      animationId = requestAnimationFrame(autoScroll)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    // Touch events для мобильных устройств
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true
      startX = e.touches[0].pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      cancelAnimationFrame(animationId)
    }

    const handleTouchEnd = () => {
      isDown = false
      scrollPosition = carousel.scrollLeft
      animationId = requestAnimationFrame(autoScroll)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      const x = e.touches[0].pageX - carousel.offsetLeft
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    carousel.addEventListener("mousedown", handleMouseDown)
    carousel.addEventListener("mouseleave", handleMouseLeave)
    carousel.addEventListener("mouseup", handleMouseUp)
    carousel.addEventListener("mousemove", handleMouseMove)
    carousel.addEventListener("touchstart", handleTouchStart)
    carousel.addEventListener("touchend", handleTouchEnd)
    carousel.addEventListener("touchmove", handleTouchMove)

    return () => {
      cancelAnimationFrame(animationId)
      carousel.removeEventListener("mousedown", handleMouseDown)
      carousel.removeEventListener("mouseleave", handleMouseLeave)
      carousel.removeEventListener("mouseup", handleMouseUp)
      carousel.removeEventListener("mousemove", handleMouseMove)
      carousel.removeEventListener("touchstart", handleTouchStart)
      carousel.removeEventListener("touchend", handleTouchEnd)
      carousel.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    console.log("[v0] Scrolling to section:", sectionId)

    const element = document.getElementById(sectionId)
    if (element) {
      console.log("[v0] Element found:", element.tagName, "with id:", element.id)

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 120

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    } else {
      console.log("[v0] Element not found for ID:", sectionId)
    }
  }

  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2a2a2a]/95 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
            <nav className="flex gap-6 text-sm">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                }}
                className="hover:text-gray-300 transition-colors"
              >
                Главная
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("process")
                }}
                className="hover:text-gray-300 transition-colors"
              >
                Процесс
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("services")
                }}
                className="hover:text-gray-300 transition-colors"
              >
                Услуги
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("portfolio")
                }}
                className="hover:text-gray-300 transition-colors"
              >
                Портфолио
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
                className="hover:text-gray-300 transition-colors"
              >
                О нас
              </button>
            </nav>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
            className="bg-[#ff6b35] hover:bg-[#e55a2b] px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Связаться с нами
          </button>
        </div>
      </header>

      <main className="px-6 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <section id="hero">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 mb-16">
              {/* Left Side - NOXEL Card */}
              <div className="bg-white text-black rounded-3xl p-8 relative overflow-visible h-[272px]">
                <h1 className="text-8xl font-black mb-4 w-full tracking-tighter leading-none">NOXEL</h1>
                <div className="absolute bottom-6 left-8 text-xl font-bold space-y-1 leading-tight">
                  <div>КРЕАТИВ</div>
                  <div>ТЕХНОЛОГИИ</div>
                  <div>БУДУЩЕЕ</div>
                </div>
                <div className="absolute -bottom-32 right-1 z-10">
                  <Image
                    src="/images/computer.png"
                    alt="Retro Computer"
                    width={320}
                    height={240}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Side - Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Contacts Card */}
                <button
                  className="bg-[#d4d4d4] text-black rounded-3xl p-6 relative col-span-2 h-20 flex items-end cursor-pointer hover:bg-[#c4c4c4] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contact")
                  }}
                >
                  <h3 className="text-lg font-bold">Контакты</h3>
                  <div className="absolute top-4 right-4">
                    <Image src="/images/triangle-blue.png" alt="Triangle" width={20} height={20} />
                  </div>
                </button>

                {/* Services Card */}
                <button
                  className="bg-[#ff6b35] text-white rounded-3xl p-6 relative aspect-square flex items-end cursor-pointer hover:bg-[#e55a2b] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("services")
                  }}
                >
                  <h3 className="text-lg font-bold">Услуги</h3>
                  <div className="absolute top-4 right-4">
                    <Image src="/images/triangle-white.png" alt="Triangle" width={20} height={20} />
                  </div>
                </button>

                {/* Portfolio Card */}
                <button
                  className="bg-[#4f7cff] text-white rounded-3xl p-6 relative aspect-square flex items-end cursor-pointer hover:bg-[#3d6bff] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("portfolio")
                  }}
                >
                  <h3 className="text-lg font-bold">Портфолио</h3>
                  <div className="absolute top-4 right-4">
                    <Image src="/images/triangle-black.png" alt="Triangle" width={20} height={20} />
                  </div>
                </button>
              </div>
            </div>
          </section>

          <section id="process">
            {/* Process Section */}
            <div className="text-center mb-12 mt-24">
              <h2 className="text-6xl font-bold mb-8">КАК МЫ СОЗДАЕМ САЙТЫ</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
                От искры идеи до живого цифрового решения — мы превращаем ваши мечты в интерактивную реальность, где
                каждый клик ведет к успеху
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Step 1 - ИДЕЯ */}
              <div
                className="bg-[#ff6b35] p-8 text-white relative overflow-hidden rounded-3xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
              >
                <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">01</div>
                <div className="absolute top-6 right-6 text-3xl font-bold">ИДЕЯ</div>
                <div className="mt-20">
                  <p className="text-lg leading-relaxed">
                    Анализ
                    <br />
                    требований и<br />
                    планирование
                  </p>
                </div>
              </div>

              {/* Step 2 - ДИЗАЙН */}
              <div
                className="bg-[#8a8a8a] p-8 text-white relative overflow-hidden rounded-3xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
              >
                <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">02</div>
                <div className="absolute top-6 right-6 text-3xl font-bold">ДИЗАЙН</div>
                <div className="mt-20">
                  <p className="text-lg leading-relaxed">
                    UX/UI
                    <br />
                    прототипирование
                  </p>
                </div>
              </div>

              {/* Step 3 - РАЗРАБОТКА */}
              <div
                className="bg-[#4f7cff] p-8 text-white relative overflow-hidden rounded-3xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
              >
                <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">03</div>
                <div className="absolute top-6 right-6 text-3xl font-bold">РАЗРАБОТКА</div>
                <div className="mt-20">
                  <p className="text-lg leading-relaxed">
                    Программирование и<br />
                    интеграция
                  </p>
                </div>
              </div>

              {/* Step 4 - ТЕСТИРОВАНИЕ */}
              <div
                className="bg-[#8a8a8a] p-8 text-white relative overflow-hidden md:col-span-1 rounded-3xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
              >
                <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">04</div>
                <div className="absolute top-6 right-6 text-3xl font-bold">ТЕСТИРОВАНИЕ</div>
                <div className="mt-20">
                  <p className="text-lg leading-relaxed">
                    Проверка качества
                    <br />и отладка
                  </p>
                </div>
              </div>

              {/* Step 5 - ЗАПУСК */}
              <div
                className="bg-[#9d4edd] p-8 text-white relative overflow-hidden md:col-span-1 rounded-3xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
              >
                <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">05</div>
                <div className="absolute top-6 right-6 text-3xl font-bold">ЗАПУСК</div>
                <div className="mt-20">
                  <p className="text-lg leading-relaxed">Деплой и поддержка</p>
                </div>
              </div>
            </div>
          </section>

          <section id="services">
            {/* Services Section */}
            <div className="text-center mb-12 mt-24">
              <h2 className="text-6xl font-bold mb-8">НАШИ УСЛУГИ</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
                Полный спектр современных веб-технологий для создания выдающихся цифровых продуктов
              </p>
            </div>

            {/* Services Carousel */}
            <div
              ref={carouselRef}
              className="overflow-x-auto pb-6 cursor-grab active:cursor-grabbing select-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-6 min-w-max px-6">
                {/* Service 1 */}
                <div
                  className="bg-[#ff6b35] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🌐</div>
                  <h3 className="text-xl font-bold mb-3">Создание веб-приложений любой сложности</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Модульные архитектуры, высокая производительность, надёжная типизация
                  </p>
                </div>

                {/* Service 2 */}
                <div
                  className="bg-[#4f7cff] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🧠</div>
                  <h3 className="text-xl font-bold mb-3">Интеграция нейросетей и AI-API</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Подключение GPT, Groq, Gemini, DALL·E для чат-ботов, ассистентов, генераторов контента
                  </p>
                </div>

                {/* Service 3 */}
                <div
                  className="bg-[#9d4edd] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">⚡️</div>
                  <h3 className="text-xl font-bold mb-3">Single Page Applications (SPA)</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Максимальная скорость, плавная навигация, реактивный пользовательский опыт
                  </p>
                </div>

                {/* Service 4 */}
                <div
                  className="bg-[#00b4d8] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-3">SSR / SSG (Next.js / Remix)</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Продвинутая SEO-оптимизация, быстрая загрузка страниц и гибкая генерация контента
                  </p>
                </div>

                {/* Service 5 */}
                <div
                  className="bg-[#f72585] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">📲</div>
                  <h3 className="text-xl font-bold mb-3">Progressive Web Applications (PWA)</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Поведение как у мобильных приложений — offline-режим, push-уведомления
                  </p>
                </div>

                {/* Service 6 */}
                <div
                  className="bg-[#8a8a8a] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🔌</div>
                  <h3 className="text-xl font-bold mb-3">Интеграции с API и внешними сервисами</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    REST, GraphQL, Firebase, Stripe, карты, SaaS — мощная связка клиент-сервер
                  </p>
                </div>

                {/* Service 7 */}
                <div
                  className="bg-[#ff6b35] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">📱</div>
                  <h3 className="text-xl font-bold mb-3">Адаптивная верстка</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Используем Tailwind, Styled Components, CSS Modules — идеальный внешний вид на всех экранах
                  </p>
                </div>

                {/* Service 8 */}
                <div
                  className="bg-[#4f7cff] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-3">Многоязычные сайты (i18n)</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Локализация и международная адаптация с использованием i18next, LinguiJS
                  </p>
                </div>

                {/* Service 9 */}
                <div
                  className="bg-[#9d4edd] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🧩</div>
                  <h3 className="text-xl font-bold mb-3">Разработка UI-компонентов</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Кастомные интерфейсы: таблицы, фильтры, калькуляторы, drag'n'drop, графики
                  </p>
                </div>

                {/* Service 10 */}
                <div
                  className="bg-[#00b4d8] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">03</div>
                  <div className="absolute top-6 right-6 text-3xl font-bold">Интеграция с Headless CMS</div>
                  <div className="mt-20">
                    <p className="text-lg leading-relaxed">
                      Подключение к Strapi, Sanity, Contentful, Hygraph — управление контентом
                    </p>
                  </div>
                </div>

                {/* Service 11 */}
                <div
                  className="bg-[#f72585] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="text-3xl mb-4">🧮</div>
                  <h3 className="text-xl font-bold mb-3">Работа с CRM, аналитикой и ERP</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Интеграции с Bitrix24, HubSpot, GA4, Amplitude, RetailCRM и другими системами
                  </p>
                </div>

                {/* Service 12 */}
                <div
                  className="bg-[#8a8a8a] p-8 text-white relative overflow-hidden rounded-3xl min-w-[350px] h-[200px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                  <div className="absolute top-6 left-6 text-5xl font-bold opacity-50">03</div>
                  <div className="absolute top-6 right-6 text-3xl font-bold">
                    Оптимизация производительности и аудит
                  </div>
                  <div className="mt-20">
                    <p className="text-lg leading-relaxed">
                      Lighthouse, Tree-shaking, Code Splitting, анализ и ускорение клиентской части
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="portfolio">
            {/* Portfolio Section */}
            <div className="text-center mb-12 mt-24">
              <h2 className="text-6xl font-bold mb-8 text-[#ff6b35]">ПОРТФОЛИО</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
                Наши лучшие проекты — от концепции до реализации
              </p>
            </div>

            {/* Portfolio Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Project 1 */}
              <div className="bg-[#3a3a3a] rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#ff6b35] to-[#e55a2b] flex items-center justify-center">
                  <div className="text-white text-6xl">🌐</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">E-commerce Platform</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Современная платформа для онлайн-торговли с интеграцией платежных систем
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="bg-[#ff6b35] hover:bg-[#e55a2b] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="bg-[#4f7cff] hover:bg-[#3d6bff] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Сайт
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-[#3a3a3a] rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#4f7cff] to-[#3d6bff] flex items-center justify-center">
                  <div className="text-white text-6xl">🧠</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">AI Assistant Dashboard</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Интеллектуальная панель управления с интеграцией нейросетей
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="bg-[#ff6b35] hover:bg-[#e55a2b] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="bg-[#4f7cff] hover:bg-[#3d6bff] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Сайт
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-[#3a3a3a] rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#9d4edd] to-[#8b3fd1] flex items-center justify-center">
                  <div className="text-white text-6xl">📱</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Mobile-First SPA</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Прогрессивное веб-приложение с фокусом на мобильный опыт
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="bg-[#ff6b35] hover:bg-[#e55a2b] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="bg-[#4f7cff] hover:bg-[#3d6bff] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Сайт
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="about">
            {/* About Us Section */}
            <div className="text-center mb-12 mt-24">
              <h2 className="text-6xl font-bold mb-8">О НАС</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-[#ff6b35]">Наша миссия</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    NOXEL — это команда профессионалов, которая создает цифровые решения будущего. Мы объединяем
                    креативность, передовые технологии и глубокое понимание бизнеса, чтобы воплощать в жизнь самые
                    смелые идеи наших клиентов.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Наш подход основан на инновациях, качестве и долгосрочном партнерстве. Мы не просто разрабатываем
                    сайты — мы создаем цифровые экосистемы, которые помогают бизнесу расти и развиваться.
                  </p>
                </div>
              </div>

              {/* Right Side - Team Photo */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#ff6b35] to-[#e55a2b] rounded-3xl p-8 h-96 flex items-center justify-center">
                  <img
                    src="/about-og-image.png"
                    alt="Команда NOXEL"
                    className="rounded-2xl object-cover w-full h-full"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#4f7cff] rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#9d4edd] rounded-full"></div>
              </div>
            </div>

            {/* Founders Section */}
            <div className="text-center mb-12 mt-24">
              <h2 className="text-6xl font-bold mb-8">ОСНОВАТЕЛИ АГЕНТСТВА</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
                Команда экспертов, которая воплощает ваши идеи в цифровую реальность
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Founder 1 - Даниил Шишкин */}
              <div className="bg-[#3a3a3a] rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="h-64 bg-gradient-to-br from-[#4f7cff] to-[#3d6bff] flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="text-white text-6xl">👨‍💻</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Даниил Шишкин</h3>
                  <h4 className="text-[#ff6b35] text-lg font-semibold mb-4">Ведущий backend разработчик</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Эксперт в области серверной разработки с глубокими знаниями Node.js, Python и архитектуры
                    микросервисов. Отвечает за техническую реализацию и масштабируемость проектов.
                  </p>
                </div>
              </div>

              {/* Founder 2 - Татьяна Эпова */}
              <div className="bg-[#3a3a3a] rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="h-64 bg-gradient-to-br from-[#9d4edd] to-[#8b3fd1] flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="text-white text-6xl">👩‍🎨</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Татьяна Эпова</h3>
                  <h4 className="text-[#ff6b35] text-lg font-semibold mb-4">Маркетолог и дизайнер</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Креативный директор с экспертизой в UX/UI дизайне и цифровом маркетинге. Создает визуальные
                    концепции и стратегии продвижения для наших клиентов.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact">
            {/* Contact CTA Section */}
            <div className="text-center mb-12 mt-24">
              <h2 className="text-6xl font-bold mb-8">Готовы обсудить ваш проект?</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed mb-12">
                Свяжитесь с нами для консультации и обсуждения деталей
              </p>

              {/* Contact Links */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Telegram */}
                <a
                  href="https://t.me/noxel_agency"
                  className="bg-[#0088cc] hover:bg-[#006ba3] px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center"
                >
                  <span className="text-2xl">📱</span>
                  Telegram
                </a>

                {/* Phone */}
                <a
                  href="tel:+79991234567"
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center"
                >
                  <span className="text-2xl">📞</span>
                  +7 (999) 123-45-67
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@noxel.agency"
                  className="bg-[#4f7cff] hover:bg-[#3d6bff] px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center"
                >
                  <span className="text-2xl">✉️</span>
                  hello@noxel.agency
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] border-t border-gray-700/50 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/logo.png" alt="NOXEL Logo" width={40} height={40} className="rounded-lg" />
                <span className="text-2xl font-bold">NOXEL</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Создаем цифровые решения будущего. Объединяем креативность, передовые технологии и глубокое понимание
                бизнеса.
              </p>
              <div className="flex gap-4">
                <a href="https://t.me/noxel_agency" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-2xl">📱</span>
                </a>
                <a href="mailto:hello@noxel.agency" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-2xl">✉️</span>
                </a>
                <a href="tel:+79991234567" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-2xl">📞</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#ff6b35]">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("services")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Веб-разработка
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("services")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    AI интеграции
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("services")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    SPA приложения
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("services")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    PWA разработка
                  </button>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#ff6b35]">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("hero")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Главная
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("process")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Процесс
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("portfolio")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Портфолио
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("about")
                    }}
                    className="hover:text-white transition-colors"
                  >
                    О нас
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 NOXEL. Все права защищены.</p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">Создано с ❤️ командой NOXEL</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
