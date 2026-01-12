import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ExercisesSection } from "@/components/exercises-section"
import { ReviewsSection } from "@/components/reviews-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="bg-gradient-to-br from-[#0a0f0a] via-[#0d1810] to-[#0a0f0a] relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent pointer-events-none" />

        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ExercisesSection />
        <ReviewsSection />
      </div>
    </main>
  )
}
