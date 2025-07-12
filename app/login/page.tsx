'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoginForm from "@/components/login-form"
import { useLanguage } from "@/hooks/useLanguage"

export default function LoginPage() {
  const {language,dir,meta}=useLanguage()
  

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access your farm dashboard</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
