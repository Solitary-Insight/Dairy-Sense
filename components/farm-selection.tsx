"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getExtrasBasedOnRegistrationStatus } from '@/lib/Utils/App/Utils/dairy_sense_utils.js'
import {
  Building,
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Leaf,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { FARM_SAVE_KEY, FLAG_CHECK_REGISTRATION_STATUS, FLAG_TO_OVERRIDE_FARM_API_CALL } from "@/lib/Constants/App/Keys"
import { ReadAndDeleteFromLocalStorage, ReadFromLocalStorage, SaveInLocalStorage } from "@/lib/Utils/Storage/LocalStorageHandler.js"
import { trimText } from "@/lib/Utils/Browser/browserUtils"
import { validateUserFromCookies } from "@/app/register/controller/CookiesValidator"
import { navigateUserBasedOnCookie } from "@/lib/Utils/Navigation/AuthBasedNavigation"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/Utils/utils"

import { FarmCardsShimmer } from '@/components/Shimmer_Loaders/FarmCardShimmer.js'
import { encryptData } from "@/lib/Utils/Browser/EncryptData"
import { TAG_OVERRIDE } from "@/lib/Constants/App/Tages"
import { SetupStatusKeys } from "@/lib/Utils/App/AppSetupStatusKeys"




export default function FarmSelection() {
  const router = useRouter()
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [farms, setFarms] = useState([])
  const { language_strings, dir, meta } = useLanguage()

  const FARM_SELECTION_TEXTS = language_strings.farm_selection_page

  function updateFarms(data) {
    const update = data.map((farm) => {
      const extras = getExtrasBasedOnRegistrationStatus({ setup_status: farm.setup_status, });
      return { ...farm, stat: extras };
    });

    setFarms(update);
    console.log("UPDATED FARMS", update); // ✅ log updated data instead of outdated state
  }


  // TODO call api to check user data:
  async function validateUserAccess() {
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
            onUserWithNoOTPVerification: () => { router.push('register') },
            // TODO: Call FUNCTION TO SAVE LOCALLY;
            onUserWithFarmsFound: (farms) => {
              updateFarms(farms)

            }

          }
        )




      }
    })

  }


  // TODO: LOAD FARMS FROM LOCAL STORAGE 

  useEffect(() => {
    function loadLocallySavedFarmList() {
      setIsLoading(true)
      const Farms_from_localstorage = ReadAndDeleteFromLocalStorage({ key: FARM_SAVE_KEY })
      if (Farms_from_localstorage != null) {
        console.log('farms-', Farms_from_localstorage)
        updateFarms(Farms_from_localstorage)

      } else {
        console.log("-------Calling api to validate user---")
        validateUserAccess()
      }
      setIsLoading(false)
    }


    return loadLocallySavedFarmList()
  }, []

  )





  useEffect(() => {
    setMounted(true)
  }, [])

  const handleContinue = async () => {
    if (!selectedFarm) return

    setIsLoading(true)


    const farm = farms.find((f) => f.id === selectedFarm)
    SaveInLocalStorage({ data: JSON.stringify(farm), key: FLAG_CHECK_REGISTRATION_STATUS })

    if (farm?.status === "configured") {
      router.push("/dashboard")
    } else {
      const encrypted_farm_id = encryptData({ payload: farm.id })
      router.push(`/setup-pending/${encrypted_farm_id}`)
    }
  }

  const getStatusColor = (setup_status) => {
    const status =  setup_status==SetupStatusKeys.FARM_DETAIL_ADDED?"pending": setup_status==SetupStatusKeys.CONFIGURED?"configured":"in-progress"
    switch (status) {
      case "configured":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (setup_status) => {
    const status =  setup_status==SetupStatusKeys.FARM_DETAIL_ADDED?"pending": setup_status==SetupStatusKeys.CONFIGURED?"configured":"in-progress"
    switch (status) {
      case "configured":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusText = (setup_status) => {
    const status =  setup_status==SetupStatusKeys.FARM_DETAIL_ADDED?"pending": setup_status==SetupStatusKeys.CONFIGURED?"configured":"in-progress"
    switch (status) {
      case "configured":
        return FARM_SELECTION_TEXTS.status_configured
      case "in-progress":
        return FARM_SELECTION_TEXTS.status_in_progress
      case "pending":
        return FARM_SELECTION_TEXTS.status_pending
      default:
        return FARM_SELECTION_TEXTS.status_unknown
    }
  }

  if (!mounted) return <FarmCardsShimmer />

  return (
    <div dir={dir} className={cn(`font-${meta.class}`, "min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12")}>
      

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6 animate-bounce-gentle">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{FARM_SELECTION_TEXTS.title_select_your_farm}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {FARM_SELECTION_TEXTS.subtitle_choose_farm}
            </p>
          </div>

          {/* Farm Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {!farms && <FarmCardsShimmer />}
            {farms && farms.map((farm, index) => (
              <Card
                key={farm.id}
                className={`cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl animate-slide-up ${selectedFarm === farm.id
                  ? "border-green-500 bg-green-50 scale-105"
                  : "border-gray-200 hover:border-green-300 bg-white/80 backdrop-blur-sm"
                  }`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
                onClick={() => setSelectedFarm(farm.id)}
              >
                <CardHeader dir="ltr" className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={farm.profile_url || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                          {trimText(farm.name)
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg leading-tight">{trimText(farm.farm_name)}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <MapPin className="w-3 h-3" />
                          {trimText(farm.farm_address)}
                        </div>
                      </div>
                    </div>
                    {selectedFarm === farm.id && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Status Badge */}
                  <Badge className={`${getStatusColor(farm.setup_status)} border flex items-center gap-1 w-fit`}>
                    {getStatusIcon(farm.setup_status)}
                    {getStatusText(farm.setup_status)}
                  </Badge>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{FARM_SELECTION_TEXTS.label_setup_progress}</span>
                      <span className="font-medium">{farm.stat.percentage}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${farm.stat.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Farm Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{farm.number_of_cattle_key} cattle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{farm.farm_type_key}</span>
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                    <Calendar className="w-4 h-4" />
                    <span>{FARM_SELECTION_TEXTS.label_registered}: {new Date(farm.created_at).toLocaleDateString()}</span>
                  </div>

                  {/* Estimated Completion */}
                  {(
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <Clock className="w-4 h-4" />
                        <span>{FARM_SELECTION_TEXTS.label_est_completion}: {FARM_SELECTION_TEXTS.time_required(farm.stat.time_required)} </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Add New Farm Card */}
            <Card className="cursor-pointer transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-green-400 bg-white/60 backdrop-blur-sm hover:bg-green-50 shadow-lg hover:shadow-xl animate-slide-up animation-delay-500">
              <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{FARM_SELECTION_TEXTS.add_farm_title}</h3>
                <p className="text-sm text-gray-600 mb-4">{FARM_SELECTION_TEXTS.add_farm_subtitle}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 hover:bg-green-50 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    localStorage.setItem(FLAG_TO_OVERRIDE_FARM_API_CALL, TAG_OVERRIDE)
                    router.push("register")
                  }}
                >
                  {FARM_SELECTION_TEXTS.add_farm_button}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
            <Button
              onClick={handleContinue}
              disabled={!selectedFarm || isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {FARM_SELECTION_TEXTS.action_loading}
                </div>
              ) : (
                <>
                  {FARM_SELECTION_TEXTS.action_continue_to} {" "}
                  {selectedFarm
                    ? farms.find((f) => f.id === selectedFarm)?.status === "configured"
                      ? FARM_SELECTION_TEXTS.action_dashboard
                      : FARM_SELECTION_TEXTS.action_setup
                    : FARM_SELECTION_TEXTS.action_select_farm}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-green-200 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
            >
              {FARM_SELECTION_TEXTS.action_back_to_home}
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-12 text-center animate-fade-in-up animation-delay-1000">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="font-semibold text-gray-900 mb-2">{FARM_SELECTION_TEXTS.help_title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {FARM_SELECTION_TEXTS.help_description}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  {FARM_SELECTION_TEXTS.help_contact_support}
                </Button>
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  {FARM_SELECTION_TEXTS.help_view_docs}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
