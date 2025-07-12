"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Users, Phone, Mail, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SetupPending() {
  const router = useRouter()
  const [status, setStatus] = useState("pending") // pending, configured
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    // Simulate status change after 30 seconds for demo
    const statusTimer = setTimeout(() => {
      setStatus("configured")
    }, 30000)

    return () => {
      clearInterval(timer)
      clearTimeout(statusTimer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    }
    return `${mins}m ${secs}s`
  }

  if (status === "configured") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Your AgroSense system has been successfully configured and is ready to use.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3 text-lg"
              >
                Access Your Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl shadow-lg mb-6">
              <Clock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Setup in Progress</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thank you for registering! Our technical team will visit your farm soon to install and configure your
              AgroSense system.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Status Card */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-slide-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Installation Status</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-3 py-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Progress Steps */}
                  <div className="space-y-6">
                    {[
                      {
                        title: "Account Created",
                        desc: "Your farm account has been successfully created",
                        completed: true,
                      },
                      { title: "Team Assignment", desc: "Technical team assigned to your location", completed: true },
                      {
                        title: "Site Visit Scheduled",
                        desc: "Our team will contact you within 24-48 hours",
                        completed: false,
                        current: true,
                      },
                      {
                        title: "System Installation",
                        desc: "Smart collars and sensors installation",
                        completed: false,
                      },
                      { title: "Configuration & Testing", desc: "System setup and initial testing", completed: false },
                      { title: "Training & Handover", desc: "Staff training and system handover", completed: false },
                    ].map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 animate-fade-in-up`}
                        style={{ animationDelay: `${200 + index * 100}ms` }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            step.completed
                              ? "bg-green-500 text-white"
                              : step.current
                                ? "bg-orange-500 text-white animate-pulse"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${step.current ? "text-orange-600" : "text-gray-900"}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Estimated Timeline */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fade-in-up animation-delay-800">
                    <h3 className="font-semibold text-blue-900 mb-2">Estimated Timeline</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800">Site Visit: 1-2 business days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800">Installation: 2-4 hours</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Timer */}
                  <div className="text-center p-4 bg-gray-50 rounded-lg animate-fade-in-up animation-delay-1000">
                    <p className="text-sm text-gray-600 mb-1">Time since registration</p>
                    <p className="text-2xl font-bold text-gray-900">{formatTime(timeElapsed)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80 animate-fade-in-up animation-delay-400">
                <CardHeader>
                  <CardTitle className="text-lg">Need Assistance?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-gray-600">+92 300 1234567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-gray-600">support@agrosense.com</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80 animate-fade-in-up animation-delay-600">
                <CardHeader>
                  <CardTitle className="text-lg">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Our certified technicians will visit your farm</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Smart collars will be fitted on your cattle</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>System configuration and testing</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Complete training for you and your staff</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>24/7 ongoing support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preparation Tips */}
              <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80 animate-fade-in-up animation-delay-800">
                <CardHeader>
                  <CardTitle className="text-lg">Preparation Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Ensure cattle are accessible for collar fitting</p>
                    <p>• Have your farm layout ready for sensor placement</p>
                    <p>• Prepare a list of your cattle with basic information</p>
                    <p>• Ensure stable internet connectivity</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
