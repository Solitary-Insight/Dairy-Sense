import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_STRINGS, LANG_META } from "@/lib/Constants/App/language"

export default function HeroSection() {
  const { language, meta, dir } = useLanguage()
  const HERO_TEXTS = LANG_STRINGS[language].hero
  return (
    <section  className={`font-${LANG_STRINGS[language].meta.class}`} dir={dir}>
      <section
        id="home"
        className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-20 lg:py-32 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {HERO_TEXTS.badge}
                </Badge>


                {/* for ltr and rtl languages  */}
                {dir == "ltr" && <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 ">
                  {HERO_TEXTS.heading.pre}
                  <span className="text-green-600">
                    {HERO_TEXTS.heading.highlight}
                  </span>
                </h1>}
                {dir === "rtl" && (
                  <h1
                    className="
      text-xl
      sm:text-2xl
      md:text-3xl
      lg:text-4xl
      xl:text-5xl
      font-bold
      text-gray-900
      leading-[2.8rem]
      sm:leading-[3.2rem]
      md:leading-[4.2rem]
      lg:leading-[5rem]
      xl:leading-[5.5rem]
      rtl-heading
    "
                  >
                    <span className="text-green-600">
                      {HERO_TEXTS.heading.highlight}
                    </span>
                    {HERO_TEXTS.heading.pre}

                  </h1>
                )}



                <p className="text-sm text-gray-600 leading-relaxed">
                  {HERO_TEXTS.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8">


                  {
                    dir == "ltr" ?
                      <>
                        <ArrowRight className="ml-2 w-5 h-5" />
                        {HERO_TEXTS.cta_primary}

                      </> :
                      <>
                        {HERO_TEXTS.cta_primary}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                  }
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">

                  {
                    dir == "ltr" ?
                      <>
                        <Play className="mr-2 w-5 h-5" />
                        {HERO_TEXTS.cta_secondary}
                      </> :
                      <>
                        {HERO_TEXTS.cta_secondary}

                        <Play className="mr-2 w-5 h-5" />
                      </>
                  }

                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  {HERO_TEXTS.trust[0]}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>

                  {HERO_TEXTS.trust[1]}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  {HERO_TEXTS.trust[2]}
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/cow_image_background.jpg"
                  alt={HERO_TEXTS.image_alt}
                  className="w-full h-auto" />
                {/* Overlay with smart collar indicators */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">

                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">{HERO_TEXTS.live_monitoring} </span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{HERO_TEXTS.status_title}</div>
                    <div className="text-green-600">{HERO_TEXTS.status_value}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
