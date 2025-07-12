import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_CONTENT, LANG_META } from "@/lib/Constants/App/language"


export default function PricingSection() {
  const { dir, meta, language } = useLanguage()
  const PRICING_TEXTS = LANG_CONTENT[language].pricing;
  return (
    <section dir={LANG_META[language].dir} id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{PRICING_TEXTS.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {PRICING_TEXTS.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TEXTS.plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-green-500 shadow-xl scale-105" : "border-gray-200 shadow-lg"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 hover:bg-green-500">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-green-600 hover:bg-green-700" : "bg-gray-900 hover:bg-gray-800"}`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">{PRICING_TEXTS.additional.trial_note}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {
              PRICING_TEXTS.additional.benefits.map((ben, index) =>  <span key={index}> {ben}</span>)
            }
        </div>
      </div>
    </div>
    </section >
  )
}
