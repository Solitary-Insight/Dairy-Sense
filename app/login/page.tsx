import Header from "@/components/header"
import Footer from "@/components/footer"
import LoginForm from "@/components/login-form"
import AnimatedBackgroundWrapper from "@/components/ui/animated-background-wrapper"


export default function LoginPage() {


  return (
    <div className="relative min-h-screen bg-transparent">
      <Header />




      <AnimatedBackgroundWrapper>
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">

              <LoginForm />
            </div>
          </div>
        </main>
      </AnimatedBackgroundWrapper>
      <Footer />
    </div>
  )
}
