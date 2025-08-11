import Header from "@/components/header"
import Footer from "@/components/footer"
import RegisterForm from "@/components/register-form"
import { useLanguage } from "@/hooks/useLanguage"
import AnimatedBackgroundWrapper from "@/components/ui/animated-background-wrapper"
import { Suspense, useState } from "react"
import  loading_animation from '@/public/animations/loading_animation.json'
import LoadingScreen from "@/components/loading-screen"

export default function RegisterPage() {

  return (
    <div className="relative min-h-screen bg-transparent">
      <Header />

      <AnimatedBackgroundWrapper>
        <main className="py-20 rounded">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">

              <Suspense fallback={<LoadingScreen
                title="DairySense"
                subtitle="Smart Dairy Farming Platform"
                loadingText="Loading Page..."
                animation={loading_animation}
              />}>
                <RegisterForm />
              </Suspense>
            </div>
          </div>
        </main>
      </AnimatedBackgroundWrapper>
      <Footer />
    </div>
  )
}
