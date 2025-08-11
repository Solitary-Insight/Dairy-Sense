import Header from "@/components/header"
import Footer from "@/components/footer"
import DemoRequestForm from "@/components/demo-request-form"
import AnimatedBackgroundWrapper from "@/components/ui/animated-background-wrapper"

export default function DemoPage() {
  return (
    <div className=" min-h-screen bg-transparent">
      <Header />

      <AnimatedBackgroundWrapper>
        <main className="py-20">

          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              <DemoRequestForm />
            </div>
          </div>
        </main>
      </AnimatedBackgroundWrapper>
      <Footer />
    </div>
  )
}
