"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Calendar, PlayCircle, CheckCircle } from 'lucide-react'

// Mock data for charts
const registrationData = [
  { month: "Jan", demos: 45, registrations: 32, completions: 28 },
  { month: "Feb", demos: 52, registrations: 38, completions: 34 },
  { month: "Mar", demos: 48, registrations: 35, completions: 31 },
  { month: "Apr", demos: 61, registrations: 44, completions: 39 },
  { month: "May", demos: 55, registrations: 41, completions: 37 },
  { month: "Jun", demos: 67, registrations: 49, completions: 43 }
]

const systemMetrics = [
  { name: "API Response Time", value: "245ms", change: -12, status: "good" },
  { name: "Database Queries/sec", value: "1,247", change: 8, status: "good" },
  { name: "Active Connections", value: "892", change: 15, status: "good" },
  { name: "Error Rate", value: "0.02%", change: -45, status: "excellent" }
]

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Demos</CardTitle>
            <PlayCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +22% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +11% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completions</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +10% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Funnel Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Funnel - Last 6 Months</CardTitle>
          <CardDescription>Track user progression from demo to completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrationData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <span className="text-gray-500">
                    {data.demos} → {data.registrations} → {data.completions}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="flex-1 bg-blue-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(data.demos / 70) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-green-100 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(data.registrations / 70) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-purple-100 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${(data.completions / 70) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Demo Requests</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Registrations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Completions</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance Metrics</CardTitle>
          <CardDescription>Real-time platform performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center text-sm ${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                    metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {metric.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
