"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4 md:mx-8 md:mt-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-6 md:py-2.5 rounded-3xl bg-card/95 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Image
            src="./images/logohead.png"
            alt="Логотип тренера"
            width={45}
            height={45}
            className="rotate-[-8deg] rounded-full"
          />
          <span className="font-sans text-lg font-normal text-foreground">Тренер Ян</span>
        </div>

        <ul className="hidden lg:flex items-center gap-6 font-sans text-sm font-light">
          <li>
            <button
              onClick={() => scrollToSection("hero")}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Главная
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Обо мне
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("services")}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Услуги
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Галерея
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="https://t.me/+79194498792"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <img src="./images/telegram-logo.webp" alt="Telegram" className="h-6 w-6 brightness-0 invert" />
          </Link>
          <Link href="tel:+79194498792" className="text-muted-foreground transition-colors hover:text-primary">
            <img src="./images/phone.png" alt="Phone" className="h-4 w-4 brightness-0 invert" />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-muted-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 bg-card/95 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden">
          <ul className="flex flex-col font-sans text-sm font-light">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="w-full text-left px-6 py-3 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                Главная
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="w-full text-left px-6 py-3 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                Обо мне
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("services")}
                className="w-full text-left px-6 py-3 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                Услуги
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("gallery")}
                className="w-full text-left px-6 py-3 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                Галерея
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
