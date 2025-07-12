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
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

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

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      // Show error snackbar (we'll implement this)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitting(false)
    // Redirect to pending setup page
    router.push("/setup-pending")
  }

  const nextStep = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6 animate-bounce-gentle">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Register Your Farm</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of dairy farmers using AgroSense to optimize their operations
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-200">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                      step <= currentStep ? "bg-green-500 text-white shadow-lg" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        step < currentStep ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <User className="w-6 h-6 text-green-600" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="animate-fade-in-up animation-delay-200">
                          <Label htmlFor="firstName" className="text-gray-700 font-medium">
                            First Name *
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
                          <Label htmlFor="lastName" className="text-gray-700 font-medium">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            required
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.lastName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="animate-fade-in-up animation-delay-400">
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email Address *
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
                            Phone Number *
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
                            Password *
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
                            Confirm Password *
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
                            <button
                              type="button"
                              className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-green-600 transition-colors"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end animate-fade-in-up animation-delay-800">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 h-12"
                        >
                          Next Step
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
                        Farm Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="animate-fade-in-up animation-delay-200">
                        <Label htmlFor="farmName" className="text-gray-700 font-medium">
                          Farm Name *
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
                          Farm Address *
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
                            City *
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
                            State/Province *
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
                            Postal Code
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
                            Number of Cattle *
                          </Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, cattleCount: value }))}>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-50">1-50 cattle</SelectItem>
                              <SelectItem value="51-100">51-100 cattle</SelectItem>
                              <SelectItem value="101-200">101-200 cattle</SelectItem>
                              <SelectItem value="201-500">201-500 cattle</SelectItem>
                              <SelectItem value="500+">500+ cattle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="animate-fade-in-up animation-delay-800">
                          <Label htmlFor="farmSize" className="text-gray-700 font-medium">
                            Farm Size (acres)
                          </Label>
                          <Input
                            id="farmSize"
                            type="number"
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            value={formData.farmSize}
                            onChange={(e) => setFormData((prev) => ({ ...prev, farmSize: e.target.value }))}
                          />
                        </div>
                        <div className="animate-fade-in-up animation-delay-900">
                          <Label htmlFor="farmType" className="text-gray-700 font-medium">
                            Farm Type *
                          </Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, farmType: value }))}>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dairy">Dairy Farm</SelectItem>
                              <SelectItem value="mixed">Mixed Farm</SelectItem>
                              <SelectItem value="organic">Organic Farm</SelectItem>
                              <SelectItem value="commercial">Commercial Farm</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between animate-fade-in-up animation-delay-1000">
                        <Button type="button" variant="outline" onClick={prevStep} className="px-8 h-12 bg-transparent">
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 h-12"
                        >
                          Next Step
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Plan Selection & Terms */}
                {currentStep === 3 && (
                  <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <CreditCard className="w-6 h-6 text-green-600" />
                        Choose Your Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { id: "basic", name: "Basic", price: "$49/month", desc: "Up to 50 cattle" },
                          { id: "pro", name: "Pro", price: "$99/month", desc: "Up to 200 cattle", popular: true },
                          { id: "enterprise", name: "Enterprise", price: "Custom", desc: "Unlimited cattle" },
                        ].map((plan, index) => (
                          <div
                            key={plan.id}
                            className={`relative border rounded-xl p-6 cursor-pointer transition-all duration-300 animate-fade-in-up ${
                              formData.planType === plan.id
                                ? "border-green-500 bg-green-50 shadow-lg scale-105"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                            }`}
                            style={{ animationDelay: `${200 + index * 100}ms` }}
                            onClick={() => setFormData((prev) => ({ ...prev, planType: plan.id }))}
                          >
                            {plan.popular && (
                              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 hover:bg-green-500">
                                Popular
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
                            Request a personalized demo after registration
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
                            I'm interested in installment payment options
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-gray-200 animate-fade-in-up animation-delay-800">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeTerms"
                            required
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                            }
                          />
                          <Label htmlFor="agreeTerms" className="text-sm leading-relaxed text-gray-700">
                            I agree to the{" "}
                            <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-green-600 hover:text-green-700 underline">
                              Privacy Policy
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
                            I would like to receive updates about new features, tips, and special offers from AgroSense
                          </Label>
                        </div>
                      </div>

                      <div className="flex justify-between animate-fade-in-up animation-delay-1000">
                        <Button type="button" variant="outline" onClick={prevStep} className="px-8 h-12 bg-transparent">
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Creating Account...
                            </div>
                          ) : (
                            "Create Account & Start Trial"
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
                    <CardTitle className="text-lg">Why Choose AgroSense?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        "30-day free trial",
                        "No setup fees",
                        "24/7 customer support",
                        "Cancel anytime",
                        "Data export available",
                      ].map((benefit, index) => (
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
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>Already have an account?</p>
                      <Link href="/login" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                        Sign in here
                      </Link>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Questions about our plans?</p>
                      <Link href="/demo" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                        Request a demo
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
