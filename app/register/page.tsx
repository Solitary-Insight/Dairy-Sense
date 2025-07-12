import Header from "@/components/header"
import Footer from "@/components/footer"
import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Register Your Farm</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of dairy farmers using AgroSense to optimize their operations. Start your free trial
                today!
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
