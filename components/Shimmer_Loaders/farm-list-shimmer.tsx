"use client"

import React from "react"
import Shimmer from "./Shimmer"
import { Sheet } from "lucide-react"
import { AnimatedFarmStatus } from "../animated-status-card"

export function FarmListShimmer({ status = null, message = '' }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">

      {/* Mobile Layout */}
      <div className="flex flex-col space-y-4 md:hidden animate-pulse">

        {/* Header */}
        <div className="flex items-start space-x-3">
          <Shimmer className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-1">
            <Shimmer className="h-4 w-28 rounded-md" /> {/* Farm Name */}
            <Shimmer className="h-3 w-20 rounded-md" /> {/* Owner Name */}
            <Shimmer className="h-3 w-24 rounded-md" /> {/* Email */}
          </div>
          <Shimmer className="h-5 w-20 rounded-full" /> {/* Status Chip */}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <Shimmer className="h-3 w-24 rounded-md" /> {/* Location */}
          <Shimmer className="h-3 w-20 rounded-md" /> {/* Cow Count */}
          <Shimmer className="h-3 w-28 rounded-md col-span-2" /> {/* Joined Date */}
        </div>
        {/* Actions */}
        <div className="flex space-x-2">

          <Shimmer className="h-8 flex-1 rounded-md" /> {/* View Details */}
          {status ? <AnimatedFarmStatus status={status} message={message} /> : <Shimmer className="h-8 flex-1 rounded-md" />}

        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex sm:items-center sm:justify-between animate-pulse">

        {/* Left Section */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Shimmer className="w-14 h-14 rounded-full" />
          <div className="flex-1 min-w-0 space-y-1">
            <Shimmer className="h-5 w-40 rounded-md" /> {/* Farm Name */}
            <Shimmer className="h-4 w-32 rounded-md" /> {/* Owner Name */}
            <Shimmer className="h-4 w-36 rounded-md" /> {/* Email */}
          </div>
        </div>

        {/* Middle Section */}
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:space-y-1 lg:mx-6">
          <Shimmer className="h-4 w-28 rounded-md" /> {/* Location */}
          <Shimmer className="h-4 w-20 rounded-md" /> {/* Cow Count */}
          <Shimmer className="h-4 w-28 rounded-md" /> {/* Joined Date */}
        </div>



        {/* Right Section */}
        <div className="flex items-center content-between space-x-3">

          {status ? <AnimatedFarmStatus status={status} message={message} /> :
            <div className="flex items-center h-100">
              <Shimmer className="h-6 w-16 flex-1 rounded-full" />

              <Shimmer className="h-8 w-32 flex-1 rounded-md" />
              <Shimmer className="h-8 w-32 flex-1 rounded-md" />

            </div>
          }



        </div>
      </div>

    </div>
  )
}
