"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Shimmer from "./Shimmer"

// Shimmer component for skeleton elements

// Farm Card Skeleton
const FarmCardSkeleton = ({ index }) => (
    <Card
        className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg animate-slide-up"
        style={{ animationDelay: `${200 + index * 100}ms` }}
    >
        <CardHeader dir="ltr" className="pb-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar skeleton */}
                    <Shimmer className="w-12 h-12 rounded-full" />
                    <div>
                        {/* Farm name skeleton */}
                        <Shimmer className="w-32 h-5 mb-2" />
                        {/* Address skeleton */}
                        <div className="flex items-center gap-1">
                            <Shimmer className="w-3 h-3" />
                            <Shimmer className="w-24 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </CardHeader>

        <CardContent className="space-y-4">
            {/* Status Badge skeleton */}
            <Shimmer className="w-20 h-6 rounded-full" />

            {/* Progress Bar skeleton */}
            <div className="space-y-2">
                <div className="flex justify-between">
                    <Shimmer className="w-24 h-4" />
                    <Shimmer className="w-8 h-4" />
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <Shimmer className="h-full w-3/4" />
                </div>
            </div>

            {/* Farm Details skeleton */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                    <Shimmer className="w-4 h-4" />
                    <Shimmer className="w-16 h-4" />
                </div>
                <div className="flex items-center gap-2">
                    <Shimmer className="w-4 h-4" />
                    <Shimmer className="w-20 h-4" />
                </div>
            </div>

            {/* Registration Date skeleton */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Shimmer className="w-4 h-4" />
                <Shimmer className="w-32 h-4" />
            </div>

            {/* Estimated Completion skeleton */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                    <Shimmer className="w-4 h-4" />
                    <Shimmer className="w-28 h-4" />
                </div>
            </div>
        </CardContent>
    </Card>
)

// Add New Farm Card Skeleton
const AddFarmCardSkeleton = () => (
    <Card className="border-2 border-dashed border-gray-300 bg-white/60 backdrop-blur-sm shadow-lg animate-slide-up animation-delay-500">
        <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
            {/* Icon skeleton */}
            <Shimmer className="w-16 h-16 rounded-full mb-4" />

            {/* Title skeleton */}
            <Shimmer className="w-24 h-5 mb-2" />

            {/* Subtitle skeleton */}
            <Shimmer className="w-32 h-4 mb-4" />

            {/* Button skeleton */}
            <Shimmer className="w-20 h-8 rounded" />
        </CardContent>
    </Card>
)

// Main component with shimmer loading
export function FarmCardsShimmer() {
    return (
        <div  className={ "min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12"}>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                   

                    <div className="min-h-screen  p-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-8">
                                <Shimmer className="w-48 h-8 mb-4" />
                                <Shimmer className="w-96 h-5" />
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {/* Generate 5 farm card skeletons */}
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FarmCardSkeleton key={index} index={index} />
                                ))}

                                {/* Add New Farm Card skeleton */}
                                <AddFarmCardSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
