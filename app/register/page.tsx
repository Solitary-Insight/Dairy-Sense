import Header from "@/components/header"
import Footer from "@/components/footer"
import RegisterForm from "@/components/register-form"
import { useLanguage } from "@/hooks/useLanguage"

export default function RegisterPage() {

  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            <RegisterForm   />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
