"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Download, CalendarIcon, FileText, BarChart3, Users, TrendingUp, DollarSign, Activity } from 'lucide-react'
import { format } from "date-fns"

const reportTemplates = [
  {
    id: 1,
    name: "User Registration Report",
    description: "Track new user registrations and conversion rates",
    category: "Users",
    icon: Users,
    lastGenerated: "2024-01-28",
    frequency: "Weekly"
  },
  {
    id: 2,
    name: "Revenue Analytics",
    description: "Subscription revenue and billing analytics",
    category: "Finance",
    icon: DollarSign,
    lastGenerated: "2024-01-27",
    frequency: "Monthly"
  },
  {
    id: 3,
    name: "Platform Usage Statistics",
    description: "User engagement and feature usage metrics",
    category: "Analytics",
    icon: BarChart3,
    lastGenerated: "2024-01-28",
    frequency: "Daily"
  },
  {
    id: 4,
    name: "System Performance Report",
    description: "Server performance, uptime, and error rates",
    category: "Technical",
    icon: Activity,
    lastGenerated: "2024-01-28",
    frequency: "Daily"
  },
  {
    id: 5,
    name: "Demo Conversion Analysis",
    description: "Demo request to customer conversion tracking",
    category: "Sales",
    icon: TrendingUp,
    lastGenerated: "2024-01-26",
    frequency: "Weekly"
  }
]

const recentReports = [
  {
    id: 1,
    name: "January 2024 User Growth",
    type: "User Registration Report",
    generatedDate: "2024-01-28 10:30",
    size: "2.3 MB",
    status: "completed"
  },
  {
    id: 2,
    name: "Q4 2023 Revenue Summary",
    type: "Revenue Analytics",
    generatedDate: "2024-01-27 15:45",
    size: "1.8 MB",
    status: "completed"
  },
  {
    id: 3,
    name: "Weekly Platform Usage",
    type: "Platform Usage Statistics",
    generatedDate: "2024-01-28 08:00",
    size: "945 KB",
    status: "completed"
  },
  {
    id: 4,
    name: "System Health Check",
    type: "System Performance Report",
    generatedDate: "2024-01-28 12:00",
    size: "1.2 MB",
    status: "processing"
  }
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  })
  const [reportFormat, setReportFormat] = useState("pdf")

  const getCategoryColor = (category: string) => {
    const colors = {
      "Users": "bg-blue-100 text-blue-800",
      "Finance": "bg-green-100 text-green-800",
      "Analytics": "bg-purple-100 text-purple-800",
      "Technical": "bg-orange-100 text-orange-800",
      "Sales": "bg-pink-100 text-pink-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "completed": { label: "Completed", color: "bg-green-100 text-green-800" },
      "processing": { label: "Processing", color: "bg-yellow-100 text-yellow-800" },
      "failed": { label: "Failed", color: "bg-red-100 text-red-800" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Reports & Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Generation */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Create custom reports with specific date ranges and formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a report template" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Format</label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Download or view previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{report.name}</h3>
                          <p className="text-xs text-gray-600">{report.type}</p>
                          <p className="text-xs text-gray-500">
                            Generated {report.generatedDate} • {report.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(report.status)}
                        {report.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Templates */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Available report types and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map((template) => {
                    const Icon = template.icon
                    return (
                      <div key={template.id} className="p-4 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{template.name}</h3>
                            <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge className={getCategoryColor(template.category)}>
                                {template.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{template.frequency}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Last: {template.lastGenerated}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reports Generated This Month</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Automated Reports</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="font-semibold">2.8 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Generation Time</span>
                    <span className="font-semibold">3.2 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
