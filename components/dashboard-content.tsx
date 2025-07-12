"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Milk,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Thermometer,
  Calendar,
} from "lucide-react"

export function DashboardContent() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Cattle</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">247</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up animation-delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Daily Milk Production</CardTitle>
            <Milk className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,847L</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up animation-delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Staff</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-gray-600 flex items-center mt-1">
              <CheckCircle className="w-3 h-3 mr-1" />
              All present today
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up animation-delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Health Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg animate-slide-up animation-delay-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Recent Activity & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "alert",
                  title: "Cow #247 - Health Alert",
                  desc: "Unusual activity pattern detected",
                  time: "2 minutes ago",
                  severity: "high",
                },
                {
                  type: "info",
                  title: "Milk Collection Complete",
                  desc: "Morning collection: 1,847L collected",
                  time: "1 hour ago",
                  severity: "normal",
                },
                {
                  type: "success",
                  title: "New Calf Born",
                  desc: "Cow #156 gave birth to healthy calf",
                  time: "3 hours ago",
                  severity: "good",
                },
                {
                  type: "alert",
                  title: "Feed Stock Low",
                  desc: "Premium feed stock below 20%",
                  time: "5 hours ago",
                  severity: "medium",
                },
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "high"
                        ? "bg-red-500"
                        : alert.severity === "medium"
                          ? "bg-orange-500"
                          : alert.severity === "good"
                            ? "bg-green-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600">{alert.desc}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Badge variant={alert.severity === "high" ? "destructive" : "secondary"} className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg animate-slide-up animation-delay-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="w-5 h-5 text-red-500" />
                Environmental Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Temperature</span>
                  <span className="font-medium">24°C</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Air Quality</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg animate-slide-up animation-delay-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: "06:00", task: "Morning Milking", status: "completed" },
                { time: "08:00", task: "Feed Distribution", status: "completed" },
                { time: "14:00", task: "Health Checkup", status: "pending" },
                { time: "18:00", task: "Evening Milking", status: "pending" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${item.status === "completed" ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
