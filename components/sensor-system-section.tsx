import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_STRINGS, LANG_META } from "@/lib/Constants/App/language"
import { Thermometer, MapPin, Activity, Zap } from "lucide-react"

const sensorFeatures = [
  {
    icon: Activity,
  },
  {
    icon: MapPin,
  },
  {
    icon: Thermometer,
  },
  {
    icon: Zap,
  },
]

export default function SensorSystemSection() {
  const { language, dir, meta } = useLanguage()
  const SENSORY_TEXT = LANG_STRINGS[language].technology
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/cow_with_collar.jpg"
                alt="Cow with smart collar showing sensor components"
                className="w-full h-auto"
              />
              {/* Sensor callouts */}
              <div dir={LANG_META[language].dir} className="absolute top-1/4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{SENSORY_TEXT.imu_active}</span>
                </div>
              </div>
              <div dir={LANG_META[language].dir} className="absolute top-1/2 left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{SENSORY_TEXT.gpa_signal}</span>
                </div>
              </div>
              <div  dir={LANG_META[language].dir} className="absolute bottom-1/4 right-8 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="font-medium">{SENSORY_TEXT.temp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div dir={LANG_META[language].dir} className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{SENSORY_TEXT.badge}</Badge>
              <h2 className="text-4xl font-bold text-gray-900">{SENSORY_TEXT.title}</h2>
              <p className="text-xl text-gray-600 leading-loose leading-relaxed">
                {SENSORY_TEXT.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {sensorFeatures.map((feature, index) => (
                <Card dir={LANG_META[language].dir} key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{SENSORY_TEXT.features[index].title}</h3>
                        <p className="text-sm leading-relaxed text-gray-600">{SENSORY_TEXT.features[index].description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div dir={LANG_META[language].dir} className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-3">{SENSORY_TEXT.key_capablities}</h3>
              <ul className="space-y-2 text-gray-600">

                {SENSORY_TEXT.capabilities.map((capablity,index) => {

                  return <li key={index}  className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {capablity}
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
