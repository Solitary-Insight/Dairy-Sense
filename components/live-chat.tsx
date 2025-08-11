"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_STRINGS } from "@/lib/Constants/App/language"
import io from "socket.io-client";
import { SERVER_ADDRESS } from "@/lib/Constants/App/API_ENDPOINTS"
import { SOCKET_CHAT_MESSAGE_EVENT_SEND_QUERY } from "@/lib/Constants/App/Tages"


export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { language, meta, dir, language_strings } = useLanguage()
  const CHAT_TEXT = language_strings.chat;
  const [messages, setMessages] = useState([{ content: CHAT_TEXT.initial_message, sender: "server" }])
  const [isConnected, setConnected] = useState(false);
  const [webSocket, SetWebSocket] = useState(null)


  const message_box_bottom_ref = useRef(null)



  useEffect(()=>{
      message_box_bottom_ref.current?.scrollIntoView({ behavior: "smooth" });

  })
  const addMessage = (newMsg) => {
   setMessages(prevMessages => [...prevMessages, newMsg]);

  };

  useEffect(() => {
    const socket = io(SERVER_ADDRESS+'/info-chat')

    SetWebSocket(socket)
    socket.on("connect", (socket) => {
      console.log("Socket connected")
    })
    socket.on("info-chat-response", (socket) => {
      addMessage({ content: socket, sender: "server" })
    })




  }, [])



  function sendMessage(message) {
    if (!webSocket || !webSocket.active) {
      console.log("Socket issue ")
      return
    }
    if (message.trim().length == 0) return
    webSocket.emit("info-chat-start", message)
    addMessage({ content: message, sender: "user" })
    setMessage('')

  }
  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div dir={LANG_STRINGS[language].meta.dir} className="fixed bottom-20 right-4 w-80 z-50">
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
                <div className="space-y-3 pb-5">
                  {/* -------------Messages--------------- */}
                  {messages.map((msg) => <MessageItem message={msg} />)}
                  <span ref={message_box_bottom_ref}></span>

                </div>

              </div>
              <div className="flex align-center gap-2">
                <input
                  type="text"
                  placeholder={CHAT_TEXT.input_placeholder}

                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1  px-3  messagesborder border-gray-300 rounded-lg textloose-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className={`${dir == "rtl" ? "mirror" : ""}`}>
                  <Button onClick={() => { sendMessage(message) }} size="sm" className="bg-green-600  text-white font-bold  hover:bg-green-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
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



  function MessageItem({ message }) {
    return (
      <div
        className={`max-w-[70%] mb-2 p-3 rounded-xl shadow-md text-sm 
          ${message.sender === "user"
            ? "bg-green-100 text-green-900 self-end ml-auto"
            : "bg-gray-100 text-gray-800 self-start mr-auto"
          }`}
      >
        <p className="leading-relaxed whitespace-pre-line break-words">
          {message.content}
        </p>
      </div>
    );
  }

}
