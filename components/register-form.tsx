"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, User, Building, Phone, Mail, Lock, CreditCard, Leaf, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/Utils/utils"
import { getLangResposiveClasses } from "@/lib/Utils/Browser/browserUtils"
import { OwnController } from '@/app/register/controller/Owner.Controller.js'
import MessageBox from "./ui/messageBox"
import OTPVerification from "./otp-verification"
import { validateUserFromCookies } from "@/app/register/controller/CookiesValidator"
import { ReadAndDeleteFromLocalStorage, SaveInLocalStorage } from '@/lib/Utils/Storage/LocalStorageHandler.js'
import { navigateUserBasedOnCookie } from '@/lib/Utils/Navigation/AuthBasedNavigation.js'
import { FARM_SAVE_KEY, FLAG_COMPLETE_PENDING_REGISTARTION, FLAG_TO_OVERRIDE_FARM_API_CALL } from "@/lib/Constants/App/Keys"
import { TAG_OVERRIDE } from "@/lib/Constants/App/Tages"
import { DairySense } from "@/lib/Constants/App/DairySenseData/DairySense"
import { FarmController } from '@/app/register/controller/Farm.Controller'

export default function RegisterForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [message, setMessage] = useState({ message: null, type: null, collapsable: true })
  const [pendingFarmRegId, SetPendingFarmRegId] = useState(null)

  const owner_controller = new OwnController()
  const farm_controller = new FarmController()


  const { language, language_strings, meta, dir } = useLanguage()

  const REGISTER_TEXTS = language_strings.register
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp_verified: false,

    // Farm Information
    farmName: "",
    farmAddress: "",
    city: "",
    state: "",
    postalCode: "",
    cattleCount: "",
    farmSize: "",
    farmType: "",

    // Preferences
    planType: "",
    requestDemo: false,
    installmentInterest: false,

    // Legal
    agreeTerms: false,
    agreeMarketing: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [otpVerificationTimer, setOtpVerificationTimer] = useState(null)
  const search_params = useSearchParams()
  const farm_key = search_params?.get("farm_key")


  useEffect(() => {
    setMounted(true)
  }, [])


  // INFO:  Handle Redirects

  function handleRedirect(farms) {
    const FLAG_TO_OVERRIDE = ReadAndDeleteFromLocalStorage({ key: FLAG_TO_OVERRIDE_FARM_API_CALL })

    if (farm_key) {
      console.log(" FARM TO UPDATE : ", farm_key)
      SetPendingFarmRegId(farm_key)
      setCurrentStep(3)
    } else {
      if (FLAG_TO_OVERRIDE == TAG_OVERRIDE) {
        setCurrentStep(2)
      }
      if (FLAG_TO_OVERRIDE == null) {
        SaveInLocalStorage({ data: JSON.stringify(farms), key: FARM_SAVE_KEY })

        router.push('/farm-selection')
      }
    }
    // console.log("FARM KEY ", farm_key); // "ks
    // const farm_from_localstorage=ReadAndDeleteFromLocalStorage(FLAG_COMPLETE_PENDING_REGISTARTION)
  }

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
            onUserWithNoOTPVerification: () => { setOtpVerificationTimer(res.data.user.createTime) },
            // TODO: Call FUNCTION TO SAVE LOCALLY;
            onUserWithFarmsFound: (farms) => {
              console.log('farms', JSON.stringify(farms, null, 2)),

                handleRedirect(farms)

            },
            onUserWithNoFarmFound: () => { setCurrentStep(2) },
            onUserWithOTPVerification: (user) => {
              setCurrentStep(2)
            }
          }
        )
      }
    })



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



  // INFO: COMPLETE FARM REGISTRATION SAVE PLAN DETAILS ----------------------
  async function SavePlanInfo(e) {
    e.preventDefault()
    const { planType, requestDemo, installmentInterest, agreeTerms, agreeMarketing } = formData
    const payload = {
      planType, requestDemo, installmentInterest, agreeTerms, agreeMarketing, farmId: pendingFarmRegId,
      onResponse: (message_string_path, type) => { showMessage(message_string_path, type); setIsSubmitting(false) },
      onSuccess: () => {
        setIsSubmitting(false)
        showMessage(['normal_msg', "FARM_PLAN_INFO_SUCCESS_MESSAGE", 'message'], "SUCCESS")
        setTimeout(() => {
          router.push("farm-selection")
        }, 3000)
      }
    }
    showMessage(['normal_msg', "FARM_PLAN_INFO_WAITING_MESSAGE", 'message'], "BLANK")
    setIsSubmitting(true)
    await farm_controller.completeFarmRegistration(payload)

    return;


  }
  // -------------------------------------------------------------
  // *************************************************************


  // INFO : SAVE OWNER INFORMATION*********************
  async function saveOwnerInfo() {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData
    const payload = {
      firstName, lastName, email, phone, password, confirmPassword,
      onResponse: (message_string_path, type) => showMessage(message_string_path, type),
      onSuccess: ({ uid, otpSendTime }) => {
        setTimeout(() => {
          // setCurrentStep(currentStep + 1)
          // console.log('', otpSendTime,uid)
          setOtpVerificationTimer(otpSendTime)
        }, 3000)
        showMessage(['normal_msg', "ACCOUNT_CREATED", 'message'], "SUCCESS")
      }
    }
    showMessage(['normal_msg', "WAIT_REGISTRATION", 'message'], "BLANK", false)
    await owner_controller.register(payload)
    return;
  }
  // ********************SAVE OWNER INFORMATION*********************


  // TODO:SAVE FARM INFORMATION*********************
  async function saveFarmInfo() {

    const {
      farmName, farmAddress, city, state, postalCode, cattleCount, farmSize, farmType, } = formData
    const payload = {
      farmName, farmAddress, city, state, postalCode, cattleCount, farmSize, farmType,
      onResponse: (message_string_path, type) => showMessage(message_string_path, type),
      onSuccess: ({ farmId }) => {
        setTimeout(() => {
          // TODO: FARM REGISTRATION STAGE ONE COMPLETE
          closeMessage()
          SetPendingFarmRegId(farmId)
          setCurrentStep(3)
        }, 3000)

        showMessage(['normal_msg', "FARM_REGISTERED", 'message'], "SUCCESS")
      }

      //  # :CONTROLLER PARAMS farmName,farmAddress,city,state,postalCode,cattleCount,farmSize,farmType,onResponse(msg,type),onSuccess({farmId})

    }
    // showMessage(['normal_msg', "FARM_REGISTRATION_WAITING_MESSAGE", 'message'], "BLANK", false)
    await farm_controller.saveFarmBasicInfo(payload)
    return;
  }

  // ********************SAVE FARM INFORMATION*********************






  const nextStep = async () => {

    if (currentStep == 1) {
      await saveOwnerInfo()
      return;
    }
    if (currentStep == 2) {
      await saveFarmInfo()
      return;
    }



    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!mounted) return null
  if (otpVerificationTimer != null) return <OTPVerification createTime={otpVerificationTimer} onOtpValidation={() => { setCurrentStep(2); setOtpVerificationTimer(null) }}></OTPVerification>

  return (

    <div
      className={cn(
        `min-h-screen py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50`,
        getLangResposiveClasses(meta)
      )}
    >


      {/* <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{REGISTER_TEXTS.pageTitle}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {REGISTER_TEXTS.pageSubTitles}
        </p>
      </div> */}
      {/* Animated Background */}

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6 animate-bounce-gentle">
              <Leaf className="w-8 h-8 text-white" />

            </div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{REGISTER_TEXTS.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {REGISTER_TEXTS.pageSubtitle}
              </p>
            </div>
          </div>


          {/* Progress Steps */}
          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-200">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${step <= currentStep ? "bg-green-500 text-white shadow-lg" : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${step < currentStep ? "bg-green-500" : "bg-gray-200"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>




          <form onSubmit={() => { console.log("YET TO BE IMPLEMENTED") }}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <User className="w-6 h-6 text-green-600" />
                        {REGISTER_TEXTS.sectionTitles.personalInfo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="animate-fade-in-up animation-delay-200">
                          <Label htmlFor="firstName" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.firstName}
                          </Label>
                          <Input
                            id="firstName"
                            required
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.firstName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="animate-fade-in-up animation-delay-300">
                          <Label htmlFor="lastName" className="text-gray-700  font-medium">
                            {REGISTER_TEXTS.labels.lastName}
                          </Label>
                          <Input
                            id="lastName"
                            required
                            className="h-12   border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.lastName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="animate-fade-in-up animation-delay-400">
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.email}

                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                            <Input
                              id="email"
                              type="email"
                              className="pl-11 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="animate-fade-in-up animation-delay-500">
                          <Label htmlFor="phone" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.phone}
                          </Label>
                          <div className="relative group">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                            <Input
                              id="phone"
                              type="tel"
                              className="pl-11 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="animate-fade-in-up animation-delay-600">
                          <Label htmlFor="password" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.password}
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
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
                        <div className="animate-fade-in-up animation-delay-700">
                          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.confirmPassword}
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              className="pl-11 pr-11 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                              required
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                            {message.message != null && <button
                              type="button"

                              className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-green-600 transition-colors"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>}
                          </div>
                        </div>
                      </div>
                      <MessageBox message={message} closeMessage={closeMessage} />


                      <div className="flex justify-end animate-fade-in-up animation-delay-800">
                        <Button
                          type="button"
                          disabled={(message.message != null && message.type != null)}
                          onClick={nextStep}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 h-12"
                        >
                          {REGISTER_TEXTS.buttons.next}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Farm Information */}
                {currentStep === 2 && (
                  <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Building className="w-6 h-6 text-green-600" />
                        {REGISTER_TEXTS.sectionTitles.farmInfo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="animate-fade-in-up animation-delay-200">
                        <Label htmlFor="farmName" className="text-gray-700 font-medium">
                          {REGISTER_TEXTS.labels.farmName}
                        </Label>
                        <Input
                          id="farmName"
                          required
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          value={formData.farmName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, farmName: e.target.value }))}
                        />
                      </div>

                      <div className="animate-fade-in-up animation-delay-300">
                        <Label htmlFor="farmAddress" className="text-gray-700 font-medium">
                          {REGISTER_TEXTS.labels.farmAddress}
                        </Label>
                        <Input
                          id="farmAddress"
                          required
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          value={formData.farmAddress}
                          onChange={(e) => setFormData((prev) => ({ ...prev, farmAddress: e.target.value }))}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="animate-fade-in-up animation-delay-400">
                          <Label htmlFor="city" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.city}
                          </Label>
                          <Input
                            id="city"
                            required
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.city}
                            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                        <div className="animate-fade-in-up animation-delay-500">
                          <Label htmlFor="state" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.state}
                          </Label>
                          <Input
                            id="state"
                            required
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.state}
                            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                          />
                        </div>
                        <div className="animate-fade-in-up animation-delay-600">
                          <Label htmlFor="postalCode" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.postalCode}
                          </Label>
                          <Input
                            id="postalCode"
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.postalCode}
                            onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="animate-fade-in-up animation-delay-700">
                          <Label htmlFor="cattleCount" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.cattleCount}
                          </Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, cattleCount: value }))}>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500">
                              <SelectValue placeholder={REGISTER_TEXTS.placeholders.cattleRange} />
                            </SelectTrigger>
                            <SelectContent>
                              {new DairySense(language).getCattleCountDropDown().map(({ key, value }) =>
                                <SelectItem value={key}>{value}</SelectItem>

                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="animate-fade-in-up animation-delay-800">
                          <Label htmlFor="farmSize" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.farmSize}
                          </Label>
                          <Input
                            id="farmSize"
                            type="number"
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.farmSize}
                            onChange={(e) => {
                              if (Number(e.target.value) >= 0) {
                                setFormData((prev) => ({ ...prev, farmSize: e.target.value }))
                              }
                            }}
                          />
                        </div>
                        <div className="animate-fade-in-up animation-delay-900">
                          <Label htmlFor="farmType" className="text-gray-700 font-medium">
                            {REGISTER_TEXTS.labels.farmType}
                          </Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, farmType: value }))}>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500">
                              <SelectValue placeholder={REGISTER_TEXTS.placeholders.farmType} />
                            </SelectTrigger>
                            <SelectContent>
                              {new DairySense(language).getFarmTypeDropDown().map(({ key, value }) =>
                                <SelectItem value={key}>{value}</SelectItem>

                              )}

                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <MessageBox message={message} closeMessage={closeMessage} />

                      <div className="flex justify-between animate-fade-in-up animation-delay-1000">
                        {/* <Button type="button" variant="outline" onClick={prevStep} className="px-8 h-12 bg-transparent">
                          {REGISTER_TEXTS.buttons.previous}
                        </Button> */}
                        <span></span>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 h-12"
                        >
                          {REGISTER_TEXTS.buttons.next}

                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Plan Selection & Terms */}
                {currentStep === 3 && (
                  <Card className="shadow-2xl  border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <CreditCard className="w-6 h-6 text-green-600" />
                        {REGISTER_TEXTS.sectionTitles.planSelection}

                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6   px-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        {REGISTER_TEXTS.plan_types.map((plan, index) => (
                          <div
                            key={plan.id}
                            className={`relative border rounded-xl p-6 cursor-pointer transition-all duration-300 animate-fade-in-up ${formData.planType === plan.value
                              ? "border-green-500 bg-green-50 shadow-lg scale-105"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                              }`}
                            style={{ animationDelay: `${200 + index * 100}ms` }}
                            onClick={() => setFormData((prev) => ({ ...prev, planType: plan.value }))}
                          >
                            {plan.popular_label && (
                              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 hover:bg-green-500">
                                {plan.popular_label}

                              </Badge>
                            )}
                            <div className="text-center">
                              <h3 className="font-semibold text-lg">{plan.name}</h3>
                              <p className="text-2xl font-bold text-green-600 my-2">{plan.price}</p>
                              <p className="text-sm text-gray-600">{plan.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 pt-4 animate-fade-in-up animation-delay-600">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="requestDemo"
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, requestDemo: checked as boolean }))
                            }
                          />
                          <Label htmlFor="requestDemo" className="text-sm text-gray-700">
                            {REGISTER_TEXTS.options.requestDemo}
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="installmentInterest"
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, installmentInterest: checked as boolean }))
                            }
                          />
                          <Label htmlFor="installmentInterest" className="text-sm text-gray-700">
                            {REGISTER_TEXTS.options.installmentInterest}
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-gray-200 animate-fade-in-up animation-delay-800">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeTerms"
                            // required
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                            }
                          />
                          <Label htmlFor="agreeTerms" className="text-sm leading-relaxed text-gray-700">
                            {REGISTER_TEXTS.legal.agreeTerms}{" "}
                            <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
                              {REGISTER_TEXTS.legal.terms}
                            </Link>{" "}
                            {REGISTER_TEXTS.legal.and}{" "}
                            <Link href="/privacy" className="text-green-600 hover:text-green-700 underline">
                              {REGISTER_TEXTS.legal.privacy}
                            </Link>
                            *
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeMarketing"
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, agreeMarketing: checked as boolean }))
                            }
                          />
                          <Label htmlFor="agreeMarketing" className="text-sm leading-relaxed text-gray-700">
                            {REGISTER_TEXTS.legal.agreeMarketing}
                          </Label>
                        </div>
                      </div>
                      <MessageBox message={message} closeMessage={closeMessage} />

                      <div className="flex justify-between animate-fade-in-up animation-delay-1000">
                        {/* <Button type="button" variant="outline" onClick={prevStep} className="px-8 h-12 bg-transparent">
                          {REGISTER_TEXTS.buttons.previous}
                        </Button> */}
                        <span></span>
                        <Button
                          onClick={SavePlanInfo}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              {REGISTER_TEXTS.buttons.submitting}
                            </div>
                          ) : (
                            REGISTER_TEXTS.buttons.submit
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6 animate-fade-in-up animation-delay-400">
                <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-lg"> {REGISTER_TEXTS.sidebar.whyChoose}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {REGISTER_TEXTS.sidebar.benefits.map((benefit, index) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-3 text-sm animate-fade-in-up"
                          style={{ animationDelay: `${600 + index * 100}ms` }}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-lg"> {REGISTER_TEXTS.sidebar.needHelp}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p> {REGISTER_TEXTS.sidebar.alreadyAccount}</p>
                      <Link href="/login" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                        {REGISTER_TEXTS.sidebar.signIn}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p> {REGISTER_TEXTS.sidebar.askPlans}</p>
                      <Link href="/demo" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                        {REGISTER_TEXTS.sidebar.request_demo}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
