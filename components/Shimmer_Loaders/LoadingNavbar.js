"use client"

import Shimmer from "./Shimmer"

export const LoadingHeader = () => (
  <header className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between flex-row-reverse">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Shimmer className="h-6 w-32 rounded" />
          <Shimmer className="w-12 h-12 rounded-full" />
        </div>

        {/* Desktop Navigation (Hidden on small screens) */}
        <div className="hidden md:flex gap-4">
          {[...Array(5)].map((_, i) => (
            <Shimmer key={i} className="h-5 w-20 rounded" />
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Shimmer className="h-8 w-24 rounded" />
          <Shimmer className="h-8 w-20 rounded" />
          <Shimmer className="h-8 w-28 rounded bg-green-200" />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Shimmer className="h-6 w-6 rounded" />
        </div>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden mt-4 pb-4 border-t border-green-100">
        <div className="flex flex-col space-y-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <Shimmer key={i} className="h-4 w-40 rounded" />
          ))}
          <div className="flex flex-col space-y-2 pt-4">
            <Shimmer className="h-8 w-24 rounded" />
            <Shimmer className="h-8 w-20 rounded" />
            <Shimmer className="h-8 w-28 rounded bg-green-200" />
          </div>
        </div>
      </div>
    </div>
  </header>
)
