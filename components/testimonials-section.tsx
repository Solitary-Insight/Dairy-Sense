import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_CONTENT, LANG_META } from "@/lib/Constants/App/language"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]




export default function TestimonialsSection() {

  const { dir, language, meta } = useLanguage()
  const TESTIMONIALS = LANG_CONTENT[language].testimonials
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{TESTIMONIALS.title}</h2>
          <p className="text-xl leading-loose text-gray-600 max-w-2xl mx-auto">
            {TESTIMONIALS.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS['list'].map((testimonial, index) => (
            <Card dir={LANG_META[language].dir} key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-green-500" />

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className=" text-gray-700 leading-loose italic">"{testimonial.quote}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="leading-loose ">
                      <div className="font-semibold  leading-loose text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.stats.map((stat, index)=>
             {
              return <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
          }
          )}
        </div>
      </div>
    </section>
  )
}
