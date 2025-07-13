'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoginForm from "@/components/login-form"


export default function LoginPage() {


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
