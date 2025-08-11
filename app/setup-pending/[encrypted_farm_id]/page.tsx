import Footer from "@/components/footer"
import Header from "@/components/header"
import SetupPending from "@/components/setup-pending"
import AnimatedBackgroundWrapper from "@/components/ui/animated-background-wrapper"

export default function SetupPendingPage() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <Header />
      <AnimatedBackgroundWrapper>

        <main className="my-2 rounded" >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">

              <SetupPending />

            </div>
          </div>
        </main>
      </AnimatedBackgroundWrapper>
      <Footer />
    </div>
  )


}
