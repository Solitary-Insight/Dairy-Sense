"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Users, MapPin, Phone, Mail, Building } from "lucide-react"

export default function DemoRequestForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    farmName: "",
    location: "",
    cattleCount: "",
    currentSystem: "",
    preferredDate: "",
    preferredTime: "",
    specificInterests: [],
    additionalNotes: "",
    installmentInterest: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specificInterests: checked
        ? [...prev.specificInterests, interest]
        : prev.specificInterests.filter((i) => i !== interest),
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in AgroSense. Our team will contact you within 24 hours to schedule your
            personalized demo.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                Farm Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="farmName">Farm Name *</Label>
                <Input
                  id="farmName"
                  required
                  value={formData.farmName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, farmName: e.target.value }))}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location (City, State) *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cattleCount">Number of Cattle *</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, cattleCount: value }))}>
                    <SelectTrigger>
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
              </div>
              <div>
                <Label htmlFor="currentSystem">Current Management System</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, currentSystem: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual/Paper-based</SelectItem>
                    <SelectItem value="basic-software">Basic Farm Software</SelectItem>
                    <SelectItem value="spreadsheets">Excel/Spreadsheets</SelectItem>
                    <SelectItem value="other-platform">Other Digital Platform</SelectItem>
                    <SelectItem value="none">No System Currently</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Demo Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Demo Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredTime: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Specific Areas of Interest</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {[
                    "Cattle Health Monitoring",
                    "Milk Production Tracking",
                    "Smart Collar Technology",
                    "Financial Management",
                    "HR & Payroll",
                    "Marketplace Integration",
                    "Feed Management",
                    "Breeding Records",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes or Questions</Label>
                <Textarea
                  id="additionalNotes"
                  rows={4}
                  placeholder="Tell us about your specific needs or any questions you have..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="installmentInterest"
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, installmentInterest: checked as boolean }))
                  }
                />
                <Label htmlFor="installmentInterest" className="text-sm">
                  I'm interested in learning about installment payment options
                </Label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Request..." : "Request Demo"}
          </Button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">30-45 Minute Demo</h4>
                  <p className="text-sm text-gray-600">Comprehensive walkthrough of all features</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Personalized Experience</h4>
                  <p className="text-sm text-gray-600">Tailored to your farm's specific needs</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Expert Consultation</h4>
                  <p className="text-sm text-gray-600">Q&A with our dairy farming specialists</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-green-600" />
                <span>demo@agrosense.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-green-600" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Lahore, Pakistan</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
