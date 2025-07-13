"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_CONTENT, LANG_META } from "@/lib/Constants/App/language"
import { getLang } from "@/lib/Utils/Browser/browserUtils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, changeLanguage, dir, meta,inverted_dir } = useLanguage();
  const HEADER_LABELS = LANG_CONTENT[language].nav

  useEffect(()=>{
    const SAVED_LANG=getLang()
    console.log("SAVED_LANG : ",SAVED_LANG)
  })

  return (
    <header dir={inverted_dir} className={`bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 font-${meta.class} `}>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-row-reverse" >
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-2">
            <span className="text-2xl font-bold text-gray-800">DairySense</span>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className=" justify-between  gap-3 hidden md:flex"
          >
            <a href="/#contact" className="text-gray-700 hover:text-green-600 transition-colors">
              {HEADER_LABELS.contact}
            </a>
            <a href="/#pricing" className="text-gray-700 hover:text-green-600 transition-colors">
              {HEADER_LABELS.pricing}
            </a>
            <a href="/demo" className="text-gray-700 hover:text-green-600 transition-colors">
              {HEADER_LABELS.request_demo}
            </a>
            <a href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
              {HEADER_LABELS.features}
            </a>
            <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              {HEADER_LABELS.home}
            </a>
          </nav>


          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="w-4 h-4 ml-2" />
                  {LANG_META[language]?.label || "Language"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(LANG_META).map(([initials, meta]) => (
                  <DropdownMenuItem key={initials} onClick={() => changeLanguage(initials)}>
                    {meta.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">
                {HEADER_LABELS.login}
              </a>
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/register">
                {HEADER_LABELS.register_farm}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>



        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-green-100">
            <nav dir={LANG_META[language].dir} className="flex flex-col   space-y-4 mt-4">
              <a href="/" className=" text-gray-700 hover:text-green-600 transition-colors">
                {HEADER_LABELS.home}
              </a>
              <a href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
                {HEADER_LABELS.features}

              </a>
              <a href="/demo" className="text-gray-700 hover:text-green-600 transition-colors">
                {HEADER_LABELS.request_demo}
              </a>
              <a href="/#pricing" className="text-gray-700 hover:text-green-600 transition-colors">
                {HEADER_LABELS.pricing}

              </a>
              <a href="/#contact" className="text-gray-700 hover:text-green-600 transition-colors">
                {HEADER_LABELS.contact}

              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Globe className="w-4 h-4 ml-2" />
                      {LANG_META[language]?.label || "Language"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {Object.entries(LANG_META).map(([initials, meta]) => (
                      <DropdownMenuItem className={`font-${meta.class}`} key={initials} onClick={() => changeLanguage(initials)}>
                        {meta.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/login">
                    {HEADER_LABELS.login}

                  </a>
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                  <a href="/register">
                    {HEADER_LABELS.register_farm}

                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
