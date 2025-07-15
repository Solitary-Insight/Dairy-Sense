"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, Leaf } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/useLanguage"
import { LANG_STRINGS } from "@/lib/Constants/App/language"
import { cn } from "@/lib/Utils/utils"

export default function LoginForm() {
  const { language, dir, meta, language_strings } = useLanguage()


  const LOGIN_TEXTS = language_strings['login']['form']


  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    // Redirect to OTP verification
    router.push("/verify-otp")
  }

  if (!mounted) return null

  return (
   
    <div
      className={cn(
            `rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4`,
            meta.dir === "rtl"
              ? `font-${language} leading-[2.25rem] tracking-[0.05em] text-right`
              : `font-${language}`
          )}
     
     
     >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Animation */}
        <div className="text-center mt-1 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4 animate-bounce-gentle">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div className="my-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{LOGIN_TEXTS.login_heading}</h1>
            <p className="text-gray-600">{LOGIN_TEXTS.login_subheading}</p>
          </div>
        </div>

        <Card dir={dir} className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">

          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl text-center text-gray-900">{LOGIN_TEXTS.login_form_heading}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 animate-fade-in-up animation-delay-200">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  {LOGIN_TEXTS.login_email_label}
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />

                  <Input
                    id="email"
                    type="email"
                    placeholder={LOGIN_TEXTS.login_email_placeholder}
                    className="pl-11 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />

                </div>
              </div>

              <div className="space-y-2 animate-fade-in-up animation-delay-400">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  {LOGIN_TEXTS.login_password_label}
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={LOGIN_TEXTS.login_password_placeholder}
                    className="pl-11 pr-11 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-green-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between animate-fade-in-up animation-delay-600">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    {LOGIN_TEXTS.login_remeber_me_checkbox_label}
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 transition-colors">
                  {LOGIN_TEXTS.login_forget_password_label}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  LOGIN_TEXTS.login_button_label
                )}
              </Button>
            </form>

            <div className="mt-8 text-center animate-fade-in-up animation-delay-1000">
              <p className="text-sm text-gray-600">
                {LOGIN_TEXTS.login_no_accout_text}{" "}
                <Link href="/register" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                  {LOGIN_TEXTS.login_no_accout_text_navigation}
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in-up animation-delay-1200">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-3">{LOGIN_TEXTS.login_need_help_text}</p>
                <div className="flex justify-center space-x-4 text-xs">
                  <Link href="/support" className="text-green-600 hover:text-green-700 transition-colors">
                    {LOGIN_TEXTS.login_contact_support}
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/demo" className="text-green-600 hover:text-green-700 transition-colors">
                    {LOGIN_TEXTS.login_request_demo}
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
