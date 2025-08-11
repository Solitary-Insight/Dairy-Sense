"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, Mail, Calendar, Users, Building2, Phone, MoreVertical, Eye, Edit, Trash2, Crown, Shield, CheckCircle, Clock, AlertCircle, Ruler, Package, Settings, Star, ChevronDown, Origami, X, Minimize, Minimize2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { FARM_TYPE_CONFIG, getStatusChip, PLAN_TYPE_CONFIG, SETUP_STATUS_CONFIG } from "@/lib/Utils/App/Utils/dairy_sense_utils"
import { SetupStatusKeys } from "@/lib/Utils/App/AppSetupStatusKeys"




export function FarmDetailsCard({ farm, onClose = () => { }, onView = () => { }, onEdit = () => { }, onDelete = () => { } }) {


    const [isExpanded, setIsExpanded] = useState(false)
    const planInfo = PLAN_TYPE_CONFIG[farm.plan_key] || PLAN_TYPE_CONFIG['none']
    const farmType = FARM_TYPE_CONFIG[farm.farm_type_key]
    const PlanIcon = planInfo?.icon
    console.log('farm', JSON.stringify(farm, null, 2))

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getShortAddress = () => {
        return `${farm.city}, ${farm.state_province}`
    }

    const getFullAddress = () => {
        return `${farm.farm_address}, ${farm.city}, ${farm.state_province} ${farm.postal_code}`
    }

    return (
        <TooltipProvider>
            <Card className="group relative overflow-hidden bg-green-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 shadow-md">
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                    {/* Premium Plan Indicator */}
                    {farm.plan_key === 'premium' && (
                        <div className="absolute top-0 overflow-scroll right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-purple-500 z-10">
                            <Crown className="absolute -top-8 -right-3 w-3 h-3 text-white transform rotate-45" />
                        </div>
                    )}

                    <CardHeader className="pb-3">
                        {/* Mobile Header */}
                        <div className="flex items-start space-x-3">
                            <div className="relative flex-shrink-0">
                                <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
                                    <AvatarImage
                                        src={farm.profile_url || "/placeholder.svg"}
                                        alt={`${farm.first_name} ${farm.last_name}`}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-bold text-sm">
                                        {getInitials(farm.first_name, farm.last_name)}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Verification Badge */}
                                <div className="absolute -bottom-1 -right-1">
                                    {farm.otp_verified ? (
                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                            <AlertCircle className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-1 mb-1">
                                            <h3 className="text-base font-bold text-gray-900 truncate">
                                                {farm.first_name} {farm.last_name}
                                            </h3>
                                            {farm.user_type === 'administrator' && (
                                                <Shield className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                            )}
                                        </div>

                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Building2 className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" />
                                            <span className="text-sm font-medium truncate">{farm.farm_name}</span>
                                        </div>

                                        <div className="flex items-center text-xs text-gray-500 mb-2">
                                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                            <span className="truncate">{getShortAddress()}</span>
                                        </div>
                                    </div>


                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem onClick={() => onView?.(farm.id)} className="cursor-pointer">
                                                <Eye className="w-4 h-4 mr-2" />
                                                View as Owner
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit?.(farm.id)} className="cursor-pointer">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit Farm
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => onDelete?.(farm.id)}
                                                className="cursor-pointer text-red-600 focus:text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu >
                                        <DropdownMenuTrigger>
                                            <Button onClick={() => onClose()} variant="ghost" size="sm" className=" ms-2 h-8 w-8 p-0 flex-shrink-0 ">
                                                <Minimize2 className="text-white-800 "></Minimize2>
                                            </Button>

                                            {/* <MoreVertical className="w-4 h-4" /> */}

                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {getStatusChip(farm.setup_status)}

                                    <Badge variant="outline" className={`${farmType.color} text-xs px-2 py-0.5`}>
                                        {farmType.label}
                                    </Badge>
                                    <Badge variant="outline" className={`${planInfo.color} ${planInfo.bg|| 'bg-gradient-to-br from-blue-50 to-indigo-50'} text-xs px-2 py-0.5`}>
                                        <PlanIcon className="w-3 h-3 mr-1" />
                                        {planInfo.label}
                                    </Badge>


                                </div>
                            </div>
                        </div>

                        {/* Mobile Progress */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700">Setup Progress</span>
                                <span className="text-xs text-gray-500">{SETUP_STATUS_CONFIG[farm.setup_status].percentage}%</span>
                            </div>
                            <Progress value={SETUP_STATUS_CONFIG[farm.setup_status].percentage} className="h-1.5 bg-green-100" />
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                        {/* Mobile Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
                                <Origami className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                                <p className="text-xs font-bold text-gray-900">{farm.number_of_cattle_key}</p>
                                <p className="text-xs text-gray-500">Cattle</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-2 text-center border border-green-100">
                                <Ruler className="w-4 h-4 text-green-600 mx-auto mb-1" />
                                <p className="text-xs font-bold text-gray-900">{farm.farm_size_acres}</p>
                                <p className="text-xs text-gray-500">Acres</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                                <Calendar className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                                <p className="text-xs font-bold text-gray-900">{formatDate(farm.created_at).split(',')[0]}</p>
                                <p className="text-xs text-gray-500">Joined</p>
                            </div>
                        </div>

                        {/* Mobile Expandable Details */}
                        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="w-full justify-between p-2 h-auto text-sm">
                                    <span>More Details</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-3 mt-3">
                                {/* Contact Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Mail className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                        <span className="text-xs text-gray-500 w-12 flex-shrink-0">Email:</span>
                                        <span className="font-medium text-gray-900 truncate text-xs">{farm.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Phone className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                        <span className="text-xs text-gray-500 w-12 flex-shrink-0">Phone:</span>
                                        <span className="font-medium text-gray-900 text-xs">{farm.phone_number}</span>
                                    </div>
                                    <div className="flex items-start text-sm">
                                        <MapPin className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-xs text-gray-500 w-12 flex-shrink-0">Address:</span>
                                        <span className="font-medium text-gray-900 text-xs leading-tight">{getFullAddress()}</span>
                                    </div>
                                </div>

                                {/* Preferences */}

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                                            <Settings className="w-3 h-3 mr-1" />
                                            Preferences
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Demo</span>
                                                <div className={`w-2 h-2 rounded-full ${farm.request_demo ? 'bg-green-400' : 'bg-gray-300'}`} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Installments</span>
                                                <div className={`w-2 h-2 rounded-full ${farm.wants_installments ? 'bg-green-400' : 'bg-gray-300'}`} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Updates</span>
                                                <div className={`w-2 h-2 rounded-full ${farm.wants_updates ? 'bg-green-400' : 'bg-gray-300'}`} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Terms</span>
                                                <div className={`w-2 h-2 rounded-full ${farm.agree_terms ? 'bg-green-400' : 'bg-gray-300'}`} />
                                            </div>
                                        </div>
                                    </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Mobile Actions */}
                        <div className="flex space-x-2 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onView?.(farm.id)}
                                className="flex-1 text-xs h-8"
                            >
                                <Eye className="w-3 h-3 mr-1" />
                                View as Owner
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit?.(farm.id)}
                                className="flex-1 text-xs h-8"
                            >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                            </Button>
                        </div>

                        {/* Mobile Footer */}
                        <div className="flex items-center justify-center mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                                <span>ID: {farm.id} | Stage: {farm.registration_stage}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                    {/* Premium Plan Indicator */}
                    {farm.plan_key === 'premium' && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-purple-500 z-10">
                            <Crown className="absolute -top-12 -right-4 w-4 h-4 text-white transform rotate-45" />
                        </div>
                    )}

                    <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Avatar className="w-16 h-16 ring-4 ring-white shadow-xl">
                                        <AvatarImage
                                            src={farm.profile_url || "/placeholder.svg"}
                                            alt={`${farm.first_name} ${farm.last_name}`}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-bold text-lg">
                                            {getInitials(farm.first_name, farm.last_name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Verification Badge */}
                                    <div className="absolute -bottom-1 -right-1">
                                        {farm.otp_verified ? (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <CheckCircle className="w-4 h-4 text-white" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Verified Account</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <AlertCircle className="w-4 h-4 text-white" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Pending Verification</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>

                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h3 className="text-xl font-bold text-gray-900 truncate">
                                            {farm.first_name} {farm.last_name}
                                        </h3>
                                        {farm.user_type === 'administrator' && (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Shield className="w-4 h-4 text-blue-600" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Administrator</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>

                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Building2 className="w-4 h-4 mr-2 text-green-500" />
                                        <span className="font-medium truncate">{farm.farm_name}</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {getStatusChip(farm.setup_status)}
                                        <Badge variant="outline" className={`${farmType.color} font-medium px-2 py-1`}>
                                            {farmType.label}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <span>

                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => onView?.(farm.id)} className="cursor-pointer">
                                            <Eye className="w-4 h-4 mr-2" />
                                            View as Owner
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onEdit?.(farm.id)} className="cursor-pointer">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit Farm
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onDelete?.(farm.id)}
                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu >
                                    <DropdownMenuTrigger>
                                        <Button onClick={() => onClose()} variant="ghost" size="sm" className=" ms-2 h-8 w-8 p-0 flex-shrink-0 ">
                                            <Minimize2 className="text-white-800 "></Minimize2>
                                        </Button>

                                        {/* <MoreVertical className="w-4 h-4" /> */}

                                    </DropdownMenuTrigger>
                                </DropdownMenu>
                            </span>
                        </div>

                        {/* Desktop Progress */}
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Setup Progress</span>
                                <span className="text-sm text-gray-500">{SETUP_STATUS_CONFIG[farm.setup_status].percentage}%</span>
                            </div>
                            <Progress value={SETUP_STATUS_CONFIG[farm.setup_status].percentage} className="h-2 bg-green-100" />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Desktop Contact Information */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Email</p>
                                        <p className="font-medium truncate text-gray-900">{farm.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mr-3">
                                        <Phone className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Phone</p>
                                        <p className="font-medium text-gray-900">{farm.phone_number}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mr-3">
                                        <MapPin className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Location</p>
                                        <p className="font-medium text-gray-900 text-sm leading-tight">{getFullAddress()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Farm Statistics */}
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                                <div className="flex items-center justify-between mb-2">
                                    <Users className="w-5 h-5 text-amber-600" />
                                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Cattle</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{farm.number_of_cattle_key}</p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                <div className="flex items-center justify-between mb-2">
                                    <Ruler className="w-5 h-5 text-green-600" />
                                    <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Size</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{farm.farm_size_acres} acres</p>
                            </div>

                            <div className={`${planInfo.bg || 'bg-gradient-to-br from-blue-50 to-indigo-50'} rounded-xl p-4 border border-blue-100`}>
                                <div className="flex items-center justify-between mb-2">
                                    <PlanIcon className={`w-5 h-5 ${planInfo.color} `} />
                                    <span className={`text-xs font-medium uppercase tracking-wide ${planInfo.color}`}>Plan</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{planInfo.label}</p>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Joined</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">{formatDate(farm.created_at)}</p>
                            </div>
                        </div>

                        {/* Desktop Preferences & Features */}
                        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Preferences & Features
                            </h4>
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Demo Requested</span>
                                    <div className={`w-3 h-3 rounded-full ${farm.request_demo ? 'bg-green-400' : 'bg-gray-300'}`} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Installments</span>
                                    <div className={`w-3 h-3 rounded-full ${farm.wants_installments ? 'bg-green-400' : 'bg-gray-300'}`} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Updates</span>
                                    <div className={`w-3 h-3 rounded-full ${farm.wants_updates ? 'bg-green-400' : 'bg-gray-300'}`} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Terms Agreed</span>
                                    <div className={`w-3 h-3 rounded-full ${farm.agree_terms ? 'bg-green-400' : 'bg-gray-300'}`} />
                                </div>
                            </div>
                        </div>

                        {/* Desktop Action Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                <span>ID: {farm.id} | Stage: {farm.registration_stage}</span>
                            </div>

                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onView?.(farm.id)}
                                    className="text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                                >
                                    <Eye className="w-3 h-3 mr-1" />
                                    View as Owner
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit?.(farm.id)}
                                    className="text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                                >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </TooltipProvider>
    )
}
