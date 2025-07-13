"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_CONTENT, LANG_META } from "@/lib/Constants/App/language"

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { language, meta, dir,language_strings } = useLanguage()
  const CHAT_TEXT = language_strings.chat;
  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div dir={LANG_META[language].dir} className="fixed bottom-20 right-4 w-80 z-50">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{CHAT_TEXT.open_button_label}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-700 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="h-48 bg-gray-50 rounded-lg p-3 overflow-y-auto">
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-sm leading-loose text-gray-700">
                      {CHAT_TEXT.initial_message}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex align-center gap-2">
                <input
                  type="text"
                  placeholder={CHAT_TEXT.input_placeholder}

                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1  px-3 py-2 border border-gray-300 rounded-lg textloose-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button size="sm" className="bg-green-600 mt-2 hover:bg-green-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50"
        size="lg"
      >
        <MessageCircle className="w-6  h-6" />
      </Button>
    </>
  )
}
