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
import { cn } from "@/lib/Utils/utils"
import MessageBox from "./ui/messageBox"
import { error } from "console"
import { login, OwnController } from "@/app/register/controller/Owner.Controller"
import { FLAG_SAVE_LOGIN_MAIL, FLAG_SAVE_LOGIN_PASS } from "@/lib/Constants/App/Keys"
import { validateUserFromCookies } from "@/app/register/controller/CookiesValidator"
import { navigateUserBasedOnCookie } from "@/lib/Utils/Navigation/AuthBasedNavigation"
import { SaveInLocalStorage } from "@/lib/Utils/Storage/LocalStorageHandler"

export default function LoginForm() {
  const { language, dir, meta, language_strings } = useLanguage()

  // Or spinner
  const [message, setMessage] = useState({ message: null, type: null, collapsable: true })

  const LOGIN_TEXTS = language_strings.login.form || {}
  const owner_controller = new OwnController()




  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

  }, [])

  // 
  // INFO : Load if email password saved in browser
  useEffect(() => {
    function loadEmailPassFromLocalStorage() {
      const email = localStorage.getItem(FLAG_SAVE_LOGIN_MAIL)
      const password = localStorage.getItem(FLAG_SAVE_LOGIN_PASS)

      setFormData({ rememberMe: (email?.length != 0 || password?.length != 0), email: email ?? '', password: password ?? "" })
    }
    formData
    loadEmailPassFromLocalStorage()
  }, [])

  // INFO: COSE MESSAGE BOX IN COMPONENT 
  function closeMessage() {
    setMessage({ message: null, type: null, collapsable: true })

  }

  // INFO: SHOW MESSAGE BOX IN COMPONENT 
  function showMessage(message, type = "INFO", auto_close = true, collapsable = true) {
    setMessage({ message, type, collapsable: collapsable })
    if (!auto_close) return
    setTimeout(() => {
      closeMessage()
    }, 3000)

  }


  //INFO:  VALIDATE IF USER IS ALREADY LOGGED IN OR NOT

  //INFO: Check and validate auth-token 
  useEffect(() => {



    // INFO: Request server to validate existing user--------------
    validateUserFromCookies({
      onValidationSuccess: (res) => {

        // -------------Result -----------------
        console.log("[AUTH RESPONSE]: ", res.data)
        const user = res.data.user
        const registered_farms = res.data.registered_farms
        const fields = { user, registered_farms }

        navigateUserBasedOnCookie(
          {
            fields,
            onUserWithNoOTPVerification: () => {
              router.push('register')
            },
            onAdministarterAccount:()=>{
              router.push("admin")
            },
            // TODO: Call FUNCTION TO SAVE LOCALLY;
            // onUserWithFarmsFound: (farms) => {
            //   console.log('farms', JSON.stringify(farms, null, 2)),

            //     SaveInLocalStorage({ data: JSON.stringify(farms), key: FARM_SAVE_KEY })

            //   router.push('/farm-selection')

            // },
            onUserWithNoFarmFound: () => { router.push('register')},
            onUserWithOTPVerification: (user) => {
              console.log('user', JSON.stringify(user, null, 2))
            }
          }
        )
      }
    })



  }, [])


  // INFO : Login Owner account here 
  const LoginAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { email, password, rememberMe } = formData
    const payload = {
      email, password, rememberMe,
      onSuccess: () => {
        setTimeout(() => {
          router.push("farm-selection")
        }, 100)
      },
      onResponse: (message, error) => {
        showMessage(message, error)
      }
    }
    setIsLoading(true)
    await owner_controller.login(payload)
    setIsLoading(false)


  }

  if (!mounted) return null

  return (

    <div
      className={cn(
        `rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4`,
        meta.dir === "rtl"
          ? `font-${meta.class} leading-[2.25rem] tracking-[0.05em] text-right`
          : `font-${meta.class}`
      )}


    >
      {/* Animated Background Elements */}

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
            <form onSubmit={LoginAccount} className="space-y-6">
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
                    checked={formData.rememberMe}
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
              <MessageBox message={message} closeMessage={closeMessage} />

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
