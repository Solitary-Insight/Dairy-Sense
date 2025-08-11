import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Shimmer from "@/components/Shimmer_Loaders/Shimmer"

export function SetupPendingShimmer() {
    return (
        <div className={`bg-white-100  w-auto bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12`}>
            <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                    <Shimmer className={'h-3 w-3'}/>
                </div>
                <Shimmer className="text-3xl font-bold text-gray-900 h-2 w-full mb-4"/>
                <Shimmer className="text-xl text-gray-600 mb-8 h-1 w-5"/>
                   
               
            </CardContent>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            {Array.from({ length: 5 }, (_, index) => (
                <Card key={index} index={index} className="w-full  my-2 shadow-md">
                    <CardContent className="p-4 flex gap-4">
                        <Shimmer className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

    )
}
