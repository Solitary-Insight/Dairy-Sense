"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import { cn } from "@/lib/Utils/utils"

type StatusType = 'loading' | 'success' | 'error' | 'updating' | 'idle'

interface AnimatedFarmStatusProps {
  status?: StatusType
  message?: string
  onRetry?: () => void
  autoHideDelay?: number
  className?: string
}

const statusConfig = {
  loading: {
    icon: Loader2,
    className: "bg-blue-50 text-blue-600 border-blue-200",
    iconClassName: "animate-spin",
    defaultMessage: "Loading farm data..."
  },
  updating: {
    icon: RefreshCw,
    className: "bg-amber-50 text-amber-600 border-amber-200",
    iconClassName: "animate-spin",
    defaultMessage: "Updating status..."
  },
  success: {
    icon: CheckCircle,
    className: "bg-green-50 text-green-600 border-green-200",
    iconClassName: "animate-bounce",
    defaultMessage: "Status updated successfully!"
  },
  error: {
    icon: XCircle,
    className: "bg-red-50 text-red-600 border-red-200",
    iconClassName: "animate-pulse",
    defaultMessage: "Failed to update status"
  },
  idle: {
    icon: AlertCircle,
    className: "bg-gray-50 text-gray-600 border-gray-200",
    iconClassName: "",
    defaultMessage: "Ready"
  }
}

export function AnimatedFarmStatus({ 
  status = 'loading', 
  message, 
  onRetry, 
  autoHideDelay,
  className 
}: AnimatedFarmStatusProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationClass, setAnimationClass] = useState("")

  const config = statusConfig[status]
  const Icon = config.icon
  const displayMessage = message || config.defaultMessage

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setAnimationClass("animate-in slide-in-from-right-5 duration-500")
      
      if (autoHideDelay && status === 'success') {
        const timer = setTimeout(() => {
          setAnimationClass("animate-out slide-out-to-right-5 duration-300")
          setTimeout(() => setIsVisible(false), 300)
        }, autoHideDelay)
        
        return () => clearTimeout(timer)
      }
    }
  }, [status, autoHideDelay])

  if (!isVisible) return null

  return (
    <div className={cn(
      "flex items-center justify-center space-x-2 rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300",
      config.className,
      animationClass,
      className
    )}>
      <Icon className={cn("w-4 h-4", config.iconClassName)} />
      <span>{displayMessage}</span>
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 text-xs underline hover:no-underline transition-all duration-200"
        >
          Retry
        </button>
      )}
    </div>
  )
}