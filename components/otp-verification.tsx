"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { validateOtp } from "@/app/register/controller/Owner.Controller"
import MessageBox from "./ui/messageBox"
import { OTP_TTL_SECONDS } from "@/lib/Utils/CREDENTIALS"
import { validateUserFromCookies } from "@/app/register/controller/CookiesValidator"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/Utils/utils"
import { getLangResposiveClasses } from "@/lib/Utils/Browser/browserUtils"

export default function OTPVerification(
  { createTime = null,
    onOtpValidation = null
  }) {

  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(createTime)) // 5 minutes
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [message, setMessage] = useState({ message: null, type: null, collapsable: true })


  const { language, language_strings, meta, dir } = useLanguage()
  const OTP_TEXTS = language_strings['otp']




  function calculateTimeLeft(start) {
    const expiryTime = start + OTP_TTL_SECONDS
    return expiryTime - start

  }



  function closeMessage() {
    setMessage({ message: null, type: null, collapsable: true })

  }


  async function SendOtp() {

    await validateUserFromCookies({
      onValidationSuccess: (res) => {
        console.log(res.data.user)
        if (res.data.user) {
          if (res.data.user.otp_verified) {
            if (onOtpValidation != null) {
              onOtpValidation()
            } else {
              console.log("VALIDATED")
              router.push('dashboard')
            }

          } else {


            setTimeLeft(calculateTimeLeft(res.data.user.createTime))
          }
        }
        else {
          // navigate to login page 
          router.push('login')

        }
      }
    })
    return
  }
  function showMessage(message, type = "INFO", auto_close = true, collapsable = true) {
    setMessage({ message, type, collapsable: collapsable })
    if (!auto_close) return
    setTimeout(() => {
      closeMessage()
    }, 3000)

  }



  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "Delete" && !otp[index] && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) return

    setIsLoading(true)

    // Simulate API call

    await validateOtp({
      otp: otpString, onResponse: (message, type) => {
        showMessage(message, type)
      },
      onSuccess: () => {
        if (onOtpValidation != null) {
          onOtpValidation()
        } else {
          console.log("VALIDATED")
          router.push('dashboard')
        }
      }
    })

    setIsLoading(false)
    // Redirect to dashboard or setup pending

  }

  const handleResend = async () => {
    showMessage(['otp', 'otp_msgs', 'requesting'], "SUCCESS")
    await SendOtp()
    closeMessage()


  }

  useEffect(() => {
    if (createTime == null) {
      handleResend()
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn(`min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4`,getLangResposiveClasses(meta))}>
    

      <div className="relative w-full max-w-md">
        {/* Logo Animation */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4 animate-bounce-gentle">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{OTP_TEXTS.verification_title}</h1>
          <p className="text-gray-600">{OTP_TEXTS.verification_subtitle}</p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-gray-900">{OTP_TEXTS.enter_code_title}</CardTitle>
            <p className="text-sm text-gray-600 mt-2">{OTP_TEXTS.enter_code_note}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* OTP Input */}
            <div dir='ltr' className="flex justify-center gap-3 animate-fade-in-up animation-delay-200">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center animate-fade-in-up animation-delay-400">
              <div className="flex items-center justify-center gvalidate-otpap-2 text-sm text-gray-600 mb-4">
                <Clock className="w-5 h-5 m-1 text-green-500" />
                <span>{OTP_TEXTS.code_expiry_prefix} {formatTime(timeLeft)}</span>
              </div>
            </div>
            <MessageBox message={message} closeMessage={closeMessage} />

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || isLoading}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-600"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {OTP_TEXTS.verifying}
                </div>
              ) : (
                OTP_TEXTS.verify_button
              )}
            </Button>

            {/* Resend */}
            <div className="text-center animate-fade-in-up animation-delay-800">
              <p className="text-sm text-gray-600 mb-2">{OTP_TEXTS.no_code_received}</p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={timeLeft != 0}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                {timeLeft == 0 ? OTP_TEXTS.resend_code : `${OTP_TEXTS.resend_in_prefix} ${formatTime(timeLeft)}`}
              </Button>
            </div>

            {/* Security Note */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in-up animation-delay-1000">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 mb-1">{OTP_TEXTS.security_note_title}</p>
                  <p className="text-greDeleteen-700">
                    {OTP_TEXTS.security_note_content}                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
