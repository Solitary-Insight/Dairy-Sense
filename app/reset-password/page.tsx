
import FarmSelection from "@/components/farm-selection"
import Footer from "@/components/footer"
import Header from "@/components/header"
import ResetPassword from "@/components/reset-password"
import AnimatedBackgroundWrapper from "@/components/ui/animated-background-wrapper"

export default function FarmSelectionPage() {

    return (
        <div className="relative min-h-screen bg-transparent">
            <Header />
            <AnimatedBackgroundWrapper>
                <main className="py-10 rounded">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">

                            <ResetPassword />
                        </div>
                    </div>
                </main>
            </AnimatedBackgroundWrapper>
            <Footer />
        </div>
    )
}
