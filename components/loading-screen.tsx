"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Shimmer from "./Shimmer_Loaders/Shimmer"

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface LoadingScreenProps {
    title?: string
    subtitle?: string
    loadingText?: string
    animationUrl?: string
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export default function LoadingScreen({
    title = "Loading",
    subtitle = "Please wait while we prepare everything",
    loadingText = "Loading...",
    animation,
    backgroundColor = "from-green-100 to-grey-600",
    textColor = "text-black",
    accentColor = "bg-green-500",
}: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [currentText, setCurrentText] = useState(loadingText)
    const [animationData, setAnimationData] = useState(null)

    const loadingTexts = [
        loadingText,
        "Initializing components...",
        "Loading resources...",
        "Preparing interface...",
        "Almost ready!",
    ]


    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + 1.5
            })
        }, 60)

        const textInterval = setInterval(() => {
            setCurrentText((prev) => {
                const currentIndex = loadingTexts.indexOf(prev)
                const nextIndex = (currentIndex + 1) % loadingTexts.length
                return loadingTexts[nextIndex]
            })
        }, 800)

        return () => {
            clearInterval(progressInterval)
            clearInterval(textInterval)
        }
    }, [])

    return (
        <div
            className={` inset-0 z-50 bg-transparent flex flex-col items-center justify-center`}
        >


            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center space-y-8 max-w-lg mx-auto h-auto px-6 text-center">
                {/* Animation Container */}
                <div className="w-32 h-32  flex items-center justify-center">

                    <Lottie animationData={animation} loop={true} autoplay={true} style={{ width: 128, height: 128 }} />

                </div>

                {/* Title and Subtitle */}
                <div className="space-y-2">
                    <h1 className={`text-4xl font-bold ${textColor} animate-fade-in`}>{title}</h1>
                    <p className={`text-lg ${textColor}/80 animate-fade-in delay-300`}>{subtitle}</p>
                </div>

                {/* Progress Section */}
                <div className="w-full max-w-sm space-y-4">
                    {/* Progress Bar */}
                    <div className="relative">
                        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                            <div
                                className={`${accentColor} h-full rounded-full transition-all duration-500 ease-out relative`}
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className={`text-sm ${textColor}/60`}>{Math.round(progress)}%</span>
                            <span className={`text-sm ${textColor}/60`}>Loading</span>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="min-h-[24px]">
                        <p className={`text-sm ${textColor}/80 animate-pulse`}>{currentText}</p>
                    </div>
                </div>

               
            </div>


        </div>
    )
}
