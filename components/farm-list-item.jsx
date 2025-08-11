"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MapPin, Users, Calendar, Mail, X } from 'lucide-react'
import { getStatusChip, SETUP_STATUS_CONFIG } from "@/lib/Utils/App/Utils/dairy_sense_utils.js"
import { FarmListShimmer } from "./Shimmer_Loaders/farm-list-shimmer"
import { FarmDetailsCard } from "./farm-details-card"
import { FarmController } from "@/app/register/controller/Farm.Controller"






export function FarmListItem({ farm, onUpdate, onStatusUpdate = () => { } }) {
  const [currentStatus, setCurrentStatus] = useState(farm.setup_status)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [item_messsage, setItemMessage] = useState({ status: null, message: null })

  // TODO: FARM DETAIL OVERLAY HANDLE  


  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === farm.setup_status) return

    setIsUpdating(true)
    setItemMessage({ status: 'updating', message: "Updating Farm Status..." })

    try {
      const controller= new FarmController()
      await controller.updateStatus({
        farm_id: farm.id, setup_status: newStatus,
        onSuccess: (value) => {
          onUpdate({...farm,setup_status:value})
          // setCurrentStatus(value)
          setItemMessage({ status: 'success', message: "Farm Status Updated Successfuly." })
          setTimeout(()=> setIsUpdating(false),3000)
        },
        onFailed: () => {
          setItemMessage({ status: 'error', message: "Failed while updating farm status!" })
          setTimeout(()=> setIsUpdating(false),3000)
        },
      })
    } catch (error) {
      setItemMessage({ status: 'error', message: "Failed while updating farm status!" })
      setTimeout(()=> setIsUpdating(false),3000)
        
    }
  }
  if (isUpdating) return <FarmListShimmer status={item_messsage.status} message={item_messsage.message} />
  if (showDetails) return <FarmDetailsCard farm={farm} onClose={() => setShowDetails(false)} />

  return (
    <div className="group shadow-md bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300">
      {/* Mobile Layout */}
      <div className="flex  flex-col space-y-4 md:hidden">
        {/* Header */}
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12 ring-2 ring-gray-100">
            <AvatarImage
              src={farm.profile_url || `/placeholder.svg?height=48&width=48&query=${farm.farm_name}`}
              alt={farm.farm_name}
              className="object-cover"
            />
            <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
              {farm.farm_name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{farm.farmName}</h3>
            <p className="text-sm text-gray-600 truncate">{farm.farm_name}</p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Mail className="w-3 h-3 mr-1" />
              <span className="overflow-hidden">{farm.email}</span>
            </div>
          </div>
          {getStatusChip(farm.setup_status)}
        </div>


        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{farm.farm_address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span>{farm.number_of_cattle_key} cows</span>
          </div>
          <div className="flex items-center text-gray-600 col-span-2">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Joined {new Date(farm.created_at).toUTCString()}</span>
          </div>
        </div>


        {/* Actions */}
        <div className="flex space-x-2">
          <Button onClick={() => setShowDetails(true)} variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={isUpdating}
                className="flex-1"
              >
                {"Update Status"}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {Object.entries(SETUP_STATUS_CONFIG).map(([key, val]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleStatusUpdate(key)}
                  className="flex items-center justify-between"
                >
                  <span>{val.label}</span>
                  {currentStatus === val.label && (
                    <div className="w-2 h-2 bg-current rounded-full" />
                  )}
                </DropdownMenuItem>
              ))}

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex sm:items-center  sm:justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Avatar className="w-14 shadow-lg h-14 ring-2 ring-gray-100">
            <AvatarImage
              src={farm.profile_url || `/placeholder.svg?height=56&width=56&query=${farm.farm_name}`}
              alt={farm.farm_name}
              className="object-cover"
            />
            <AvatarFallback className="bg-green-100 shadow-lg text-green-700 font-semibold text-lg">
              {farm.farm_name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">{farm.farmName}</h3>
            <p className="text-gray-600 truncate">{farm.farm_name}</p>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Mail className="w-4 h-4 mr-1" />
              <span className="truncate">{farm.email}</span>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:space-y-1 lg:mx-6">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{farm.farm_address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span>{farm.number_of_cattle_key} cows</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Joined {new Date(farm.created_at).toUTCString()}</span>
          </div>
        </div>


        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <span>
            {getStatusChip(farm.setup_status)}
          </span>
          <div className=" space-x-2">
            <Button onClick={() => setShowDetails(true)} variant="outline" size="sm">
              View Details
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isUpdating}
                  className="min-w-[120px]"
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {Object.entries(SETUP_STATUS_CONFIG).map(([key, val]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => handleStatusUpdate(key)}
                    className="flex items-center justify-between"
                  >
                    <span>{val.label}</span>
                    {currentStatus === val.label && (
                      <div className="w-2 h-2 bg-current rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

