import Header from "@/components/header"
import Footer from "@/components/footer"
import DemoRequestForm from "@/components/demo-request-form"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Demo</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See AgroSense in action! Schedule a personalized demo and discover how our intelligent dairy farm
                management system can transform your operations.
              </p>
            </div>
            <DemoRequestForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
