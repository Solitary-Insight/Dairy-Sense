"use client"

import { Button } from "@/components/ui/button"
import { Search, RefreshCw, MilkIcon as Cow } from "lucide-react"

export default function NothingFound({
  title = "No Results Found",
  description = "We couldn't find what you're looking for. Try adjusting your search or filters.",
  showRetry = false,
  onRetry=null,
  actionLabel = "Clear Filters",
  onAction=null,
  LeadingIcon = <Cow className="w-8 h-8 text-green-600" />,
  ActionIcon = <Search className="w-4 h-4 mr-2  text-white-100" />
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          {LeadingIcon }
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}

          {onAction && (
            <Button onClick={onAction} className="bg-green-600 hover:bg-green-700">
            {ActionIcon }
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
