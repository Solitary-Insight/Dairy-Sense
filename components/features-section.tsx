import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { DairySense } from "@/lib/Constants/App/DairySenseData/DairySense"
import { LANG_STRINGS } from "@/lib/Constants/App/language"
import { Heart, Milk, Users, Truck, BarChart3, ShoppingCart, Activity, MapPin } from "lucide-react"


export default function FeaturesSection() {
  const { language, dir, meta } = useLanguage()
  const FEATURES_TEXT = LANG_STRINGS[language].features

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{FEATURES_TEXT.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {FEATURES_TEXT.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {new DairySense(language).getDSFeatures().map((feature, index) => (
            <Card dir={LANG_STRINGS[language].meta.dir} key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
