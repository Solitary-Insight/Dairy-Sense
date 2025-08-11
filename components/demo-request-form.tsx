"use client"



// BUG : "THIS SECTION NEED TO BE REMOVED LATER "
import { fillTestDemoData } from '@/lib/Constants/App/Testing/Dummy Data_For_Testing.js'





import type React from "react"
import { DemoController } from '@/app/demo/demo-controller'
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Users, MapPin, Phone, Mail, Building } from "lucide-react"
import MessageBox from "./ui/messageBox"
import { getLangResposiveClasses, scrollElementCenter } from "@/lib/Utils/Browser/browserUtils"
import { DairySense } from '@/lib/Constants/App/DairySenseData/DairySense'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/Utils/utils'
const PERSONAL_INFO = "PERSONAL_INFO";
const FARM_INFO = "FARM_INFO";
const DEMO_PREFER = "DEMO_PREFER";
const sections = [PERSONAL_INFO, FARM_INFO, DEMO_PREFER];
export default function DemoRequestForm() {
  const [message, setMessage] = useState({ message: null, type: null, collapsable: true })
  const [error_section, SetErrorSection] = useState(PERSONAL_INFO)

  //INFO Message boxes references 
  const personal_info_mb = useRef(null)
  const farm_info_mb = useRef(null)
  const demo_prefer_mb = useRef(null)
  const mb_refs = [personal_info_mb, farm_info_mb, demo_prefer_mb]


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
    additionalNotes: "",

    cattleHealthMonitoringRequired: false,
    milkProductionTrackingRequired: false,
    smartCollarTechnologyRequired: false,
    financeManagementRequired: false,
    hrAndPayrolRequired: false,
    marketPlaceIntegrationRequired: false,
    feedManagementRequired: false,
    breedingRecordsRequired: false,
    installmentInterest: false,
  })

  // BUG : "NEED TO REMOVED IN PRODUCTIO"
  useEffect(() => { setFormData(fillTestDemoData()) }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { language, dir, language_strings, meta } = useLanguage()
  const DEMO_REQ_TEXTS = language_strings.demo

  const ds = new DairySense(language)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const demo_controller = new DemoController(formData)
    demo_controller.saveDemoRecord(
      {
        onSuccess: () => {
          setIsSubmitting(false)
          SetErrorSection(sections[2])
          showMessage(['normal_msg', "DEMO_REQ_SUCCESS", 'message'], "SUCCESS")
          setTimeout(() => {
            setIsSubmitted(true)


          }, 3000)

        },

        onResponse: (message, type, stage) => {
          setIsSubmitting(false)
          SetErrorSection(sections[stage])
          showMessage(message, type, true, true);

          scrollElementCenter({ element: mb_refs[stage], delay: 100 })
        },
        onFailed: () => {
          SetErrorSection(sections[2])
          showMessage(['normal_msg', "DEMO_REQ_FAILED", 'message'], "SUCCESS")

          setIsSubmitting(false)
        }

      }
    )
    console.log('demo_controller', JSON.stringify(demo_controller, null, 2))


  }

  // ----------------------HELPER FUNCTIONS ----------------/
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



  if (isSubmitted) {
    return (
      <div className={`font-${meta.class}`}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{DEMO_REQ_TEXTS.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {DEMO_REQ_TEXTS.tagline}
          </p>
        </div>
        <Card className={cn(getLangResposiveClasses(meta), "max-w-2xl mx-auto")} dir='dir'>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{DEMO_REQ_TEXTS.demo_submitted.heading}</h2>
            <p className="text-gray-600 mb-6">
              {DEMO_REQ_TEXTS.demo_submitted.sub_heading}
            </p>
            <Button asChild>
              <a href="/">{DEMO_REQ_TEXTS.demo_submitted.back_btn_text}</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`font-${meta.class}`}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{DEMO_REQ_TEXTS.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {DEMO_REQ_TEXTS.tagline}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Animated Background */}

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="mb-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  {DEMO_REQ_TEXTS.personal_info.heading}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{DEMO_REQ_TEXTS.personal_info.first_name}</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{DEMO_REQ_TEXTS.personal_info.last_name}</Label>
                    <Input

                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">{DEMO_REQ_TEXTS.personal_info.email_address}</Label>
                    <Input

                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{DEMO_REQ_TEXTS.personal_info.phone_number}</Label>
                    <Input

                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* INFO: MESSGE BOX TO SHOW MESSAGE  */}
            {error_section == PERSONAL_INFO
              &&
              <span ref={personal_info_mb}><MessageBox message={message} closeMessage={closeMessage} />
              </span>
            }


            {/* Farm Information */}
            <Card >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-green-600" />
                  {DEMO_REQ_TEXTS.farm_info.heading}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="farmName">{DEMO_REQ_TEXTS.farm_info.farm_name}</Label>
                  <Input
                    id="farmName"
                    value={formData.farmName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, farmName: e.target.value }))}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location (City, State) *</Label>
                    <Input

                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cattleCount">{DEMO_REQ_TEXTS.farm_info.number_of_cattle} </Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, cattleCount: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={DEMO_REQ_TEXTS.farm_info.select_range} />
                      </SelectTrigger>
                      <SelectContent>
                        {ds.getCattleCountDropDown().map(({ key, value }) =>
                          <SelectItem value={key}>{value}</SelectItem>

                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="currentSystem">{DEMO_REQ_TEXTS.farm_info.current_sytem}</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, currentSystem: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current system" />
                    </SelectTrigger>
                    <SelectContent>
                      {ds.getSystemOptions().map(
                        ({ key, value }) => <SelectItem value={key}>{value}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {error_section == FARM_INFO
              &&
              <span ref={farm_info_mb}><MessageBox message={message} closeMessage={closeMessage} />
              </span>
            }

            {/* Demo Preferences */}
            <Card >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  {DEMO_REQ_TEXTS.demo_preferences.heading}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate">{DEMO_REQ_TEXTS.demo_preferences.prefered_date}</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTime">{DEMO_REQ_TEXTS.demo_preferences.prefered_time}</Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredTime: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={DEMO_REQ_TEXTS.demo_preferences.select_time} />
                      </SelectTrigger>
                      <SelectContent>
                        {ds.getTimeSlotOptions().map((option) => (
                          <SelectItem key={option.key} value={option.key}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">{DEMO_REQ_TEXTS.demo_preferences.specific_interest}</Label>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    {ds.getFeaturesRequiredOptions().map(({ label, key }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData[key]}
                          id={key}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, [key]: checked }))
                          }
                        />
                        <Label htmlFor={key} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalNotes">{DEMO_REQ_TEXTS.demo_preferences.additional_note}</Label>
                  <Textarea
                    id="additionalNotes"
                    rows={4}
                    placeholder={DEMO_REQ_TEXTS.demo_preferences.additional_note_placeholder}
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
                    {DEMO_REQ_TEXTS.demo_preferences.installment_intrest}
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* INFO : CARD TO SHOW A MESSAGE  */}

            {error_section == DEMO_PREFER
              &&
              <span ref={demo_prefer_mb}><MessageBox message={message} closeMessage={closeMessage} />
              </span>
            }

            {/* INFO: MESSGE BOX TO SHOW MESSAGE  */}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Request..." : "Request Demo"}
            </Button>
          </div>


          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {DEMO_REQ_TEXTS.sidebar.what_to_expect}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{DEMO_REQ_TEXTS.sidebar.demo_title}</h4>
                    <p className="text-sm text-gray-600">{DEMO_REQ_TEXTS.sidebar.demo_desc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{DEMO_REQ_TEXTS.sidebar.personalized_title}</h4>
                    <p className="text-sm text-gray-600">{DEMO_REQ_TEXTS.sidebar.personalized_desc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{DEMO_REQ_TEXTS.sidebar.consultation_title}</h4>
                    <p className="text-sm text-gray-600">{DEMO_REQ_TEXTS.sidebar.consultation_desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {DEMO_REQ_TEXTS.sidebar.contact_info}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>{DEMO_REQ_TEXTS.sidebar.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>{DEMO_REQ_TEXTS.sidebar.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>{DEMO_REQ_TEXTS.sidebar.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </form>
    </div>

  )
}
