'use client'
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_STRINGS, LANG_META } from "@/lib/Constants/App/language"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export default function Footer() {
  const { language, dir,meta } = useLanguage()
  const FOOTER_TEXTS = LANG_STRINGS[language].footer

  return (
    <footer dir={LANG_META[language].dir} className={`bg-gray-900 text-white font-${meta.class}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold">{FOOTER_TEXTS.company_name}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">{FOOTER_TEXTS.tagline}</p>
            <div className="text-sm text-green-400 font-medium">
              {FOOTER_TEXTS.planet_friendly}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {FOOTER_TEXTS.quick_links.title}
            </h3>
            <ul className="space-y-2 text-gray-400">
              {FOOTER_TEXTS.quick_links.items.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {FOOTER_TEXTS.support.title}
            </h3>
            <ul className="space-y-2 text-gray-400">
              {FOOTER_TEXTS.support.items.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {FOOTER_TEXTS.contact.title}
            </h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{FOOTER_TEXTS.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{FOOTER_TEXTS.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{FOOTER_TEXTS.contact.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">{FOOTER_TEXTS.bottom.copyright}</div>
          <div className="flex gap-6 text-sm text-gray-400">
            {FOOTER_TEXTS.bottom.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
