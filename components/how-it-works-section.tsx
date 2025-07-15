import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_STRINGS } from "@/lib/Constants/App/language"
import { ArrowRight,} from "lucide-react"



export default function HowItWorksSection() {

  const {language,meta,dir} =useLanguage()
  const PROCEDURE_TEXT=LANG_STRINGS[language].how_it_works
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{PROCEDURE_TEXT.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {PROCEDURE_TEXT.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-green-200 to-purple-200 -translate-y-1/2 z-0"></div>

            {PROCEDURE_TEXT.steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-400">{step.step}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow for mobile */}
                {index < PROCEDURE_TEXT.steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4 mb-4">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{PROCEDURE_TEXT.cta_title}</h3>
            <p className="text-gray-600 mb-6">
              {PROCEDURE_TEXT.cta_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              {PROCEDURE_TEXT.cta_primary}
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
              {PROCEDURE_TEXT.cta_secondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
