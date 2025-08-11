"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Users, Calendar, PlayCircle, Settings, TrendingUp, AlertTriangle, CheckCircle, Clock, Search, Filter, Download, Bell, LogOut, BarChart3, UserCheck, MessageSquare, Menu, CircleUserRound, X, LogIn, MonitorCog } from 'lucide-react'
import AnalyticsCharts from "@/components/admin/analytics-charts"
import EmailTemplates from "@/components/admin/email-templates"
import FarmList from "@/components/admin/farms-list"
import { validateUserFromCookies } from "../register/controller/CookiesValidator"
import { navigateUserBasedOnCookie } from "@/lib/Utils/Navigation/AuthBasedNavigation"
import NothingFound from "@/components/nothing-found"
import { useRouter } from "next/navigation"
import AnimatedBackgroundWrapper from "@/components/ui/animated-background-wrapper"

// Mock data
const farmOwners = [
  {
    id: 1,
    name: "John Smith",
    email: "john@smithfarm.com",
    farmName: "Smith Dairy Farm",
    registrationStage: "completed",
    joinedDate: "2024-01-15",
    location: "Wisconsin, USA",
    cowCount: 150,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@valleyfarm.com",
    farmName: "Valley Green Farm",
    registrationStage: "pending-verification",
    joinedDate: "2024-01-20",
    location: "California, USA",
    cowCount: 200,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "David Johnson",
    email: "david@johnsondairy.com",
    farmName: "Johnson Dairy Co.",
    registrationStage: "setup-in-progress",
    joinedDate: "2024-01-22",
    location: "Texas, USA",
    cowCount: 300,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@wilsonfarms.com",
    farmName: "Wilson Family Farms",
    registrationStage: "demo-requested",
    joinedDate: "2024-01-25",
    location: "Vermont, USA",
    cowCount: 75,
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

const demoRequests = [
  {
    id: 1,
    farmerName: "Robert Brown",
    email: "robert@brownfarm.com",
    farmName: "Brown Acres",
    requestDate: "2024-01-28",
    status: "pending",
    preferredDate: "2024-02-05",
    cowCount: 120,
    notes: "Interested in milk production tracking"
  },
  {
    id: 2,
    farmerName: "Lisa Anderson",
    email: "lisa@andersondairy.com",
    farmName: "Anderson Dairy",
    requestDate: "2024-01-27",
    status: "scheduled",
    preferredDate: "2024-02-03",
    cowCount: 180,
    notes: "Focus on health monitoring features"
  },
  {
    id: 3,
    farmerName: "Michael Davis",
    email: "mike@davisfarms.com",
    farmName: "Davis Family Farm",
    requestDate: "2024-01-26",
    status: "completed",
    preferredDate: "2024-02-01",
    cowCount: 95,
    notes: "Small farm, budget conscious"
  }
]

const scheduledMeetings = [
  {
    id: 1,
    title: "Demo - Anderson Dairy",
    farmer: "Lisa Anderson",
    date: "2024-02-03",
    time: "10:00 AM",
    type: "demo",
    status: "confirmed"
  },
  {
    id: 2,
    title: "Setup Call - Johnson Dairy",
    farmer: "David Johnson",
    date: "2024-02-04",
    time: "2:00 PM",
    type: "setup",
    status: "confirmed"
  },
  {
    id: 3,
    title: "Follow-up - Smith Farm",
    farmer: "John Smith",
    date: "2024-02-05",
    time: "11:00 AM",
    type: "follow-up",
    status: "pending"
  }
]

class ErrorStates {
  static NO_ERR = ''
  static OWNER_TRYING_ADMIN = 'O->A'
  static INVLAID_TRYING_ADMIN = 'I->A'
}


export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [errorState, setErrorState] = useState(ErrorStates.NO_ERR)
  const router = useRouter()

  // TODO call api to check user data:
  async function validateUserAccess() {
    // INFO: Request server to validate existing user--------------
    validateUserFromCookies({
      onValidationSuccess: (res) => {
        // -------------Result -----------------
        const user = res.data.user
        const registered_farms = res.data.registered_farms
        const fields = { user, registered_farms }

        navigateUserBasedOnCookie(
          {
            fields, onUserWithNoOTPVerification: () => { router.push('register') },
            onOwnerAccount: () => {
              setErrorState(ErrorStates.OWNER_TRYING_ADMIN)
            }
            , onNoUserFound: () => {
              setErrorState(ErrorStates.INVLAID_TRYING_ADMIN)

            }
          })
      },onValidationFailed:(error)=>{
        // setErrorState(ErrorStates.INVLAID_TRYING_ADMIN)
      }
    })
  }

  useEffect(() => {
    validateUserAccess()

  }, [])
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "completed": { label: "Completed", variant: "default" as const, color: "bg-green-100 text-green-800" },
      "pending-verification": { label: "Pending Verification", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      "setup-in-progress": { label: "Setup in Progress", variant: "outline" as const, color: "bg-blue-100 text-blue-800" },
      "demo-requested": { label: "Demo Requested", variant: "destructive" as const, color: "bg-purple-100 text-purple-800" },
      "pending": { label: "Pending", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      "scheduled": { label: "Scheduled", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
      "confirmed": { label: "Confirmed", variant: "default" as const, color: "bg-green-100 text-green-800" }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const MobileNavigation = () => (
    <div className="flex flex-col space-y-2 p-4">
      <Button variant="ghost" size="sm" asChild className="justify-start">
        <Link href="/admin/users">
          <Users className="w-4 h-4 mr-2" />
          Users
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild className="justify-start">
        <Link href="/admin/reports">
          <BarChart3 className="w-4 h-4 mr-2" />
          Reports
        </Link>
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        <Bell className="w-4 h-4 mr-2" />
        Notifications
      </Button>
      <Button variant="ghost" size="sm" className="justify-start">
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  )


  // /INFO OWNER_TRYING_ADMIN → Button to navigate to Owner Panel
  if (errorState === ErrorStates.OWNER_TRYING_ADMIN) {
    return (
      <AnimatedBackgroundWrapper >
        <div className="w-screen h-screen flex align-center justify-center">
          <NothingFound
            LeadingIcon={<CircleUserRound />}
            title="You do not have Admin Access"
            showRetry={false}
            actionLabel="Go to Owner Panel"
            ActionIcon={<MonitorCog />}
            onAction={() => router.push("dashboard")}
            description="Sorry! Currently, you do not have access to admin panel. "
          />
        </div>
      </AnimatedBackgroundWrapper>
    );
  }

  //INFO INVLAID_TRYING_ADMIN → Button to log in
  if (errorState === ErrorStates.INVLAID_TRYING_ADMIN) {
    return (
      <AnimatedBackgroundWrapper>
        <div className="w-screen h-screen  flex align-center justify-center">

          <NothingFound
            LeadingIcon={<CircleUserRound />}
            title="You are currently logged out"
            showRetry={false}
            actionLabel="Login"
            ActionIcon={<LogIn />}
            onAction={() => router.push("login")}
            description="Your session may have expired or you are not logged in. Please log in to continue."
          />
        </div>
      </AnimatedBackgroundWrapper>
    );
  }
  return (

    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg md:text-xl font-semibold text-gray-900">DairySense Admin</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/users">Users</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/reports">Reports</Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline ml-1">Logout</span>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">D</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">DairySense</span>
                  </div>
                  <MobileNavigation />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Farm Owners</CardTitle>
              <Users className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Demo Requests</CardTitle>
              <PlayCircle className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Meetings</CardTitle>
              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">System Health</CardTitle>
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="farms" className="space-y-4 md:space-y-6">
          {/* Mobile-friendly tabs */}
          <div className="overflow-x-auto">
            <TabsList className="grid w-max grid-cols-8 md:w-full">
              <TabsTrigger value="farms" className="text-xs md:text-sm">Farms</TabsTrigger>
              <TabsTrigger value="owners" className="text-xs md:text-sm">Owners</TabsTrigger>
              <TabsTrigger value="demos" className="text-xs md:text-sm">Demos</TabsTrigger>
              <TabsTrigger value="meetings" className="text-xs md:text-sm">Meetings</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
              <TabsTrigger value="maintenance" className="text-xs md:text-sm">Maintenance</TabsTrigger>
              <TabsTrigger value="users" className="text-xs md:text-sm">Users</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs md:text-sm">Reports</TabsTrigger>
            </TabsList>
          </div>

          < TabsContent value="farms" className="space-y-4 md:space-y-6" >
            <FarmList />
          </TabsContent>


          {/* Farm Owners Tab */}
          <TabsContent value="owners" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <CardTitle className="text-lg md:text-xl">Farm Owners</CardTitle>
                    <CardDescription className="text-sm">Manage registered farm owners and their registration status</CardDescription>
                  </div>
                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search owners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full md:w-64"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending-verification">Pending Verification</SelectItem>
                          <SelectItem value="setup-in-progress">Setup in Progress</SelectItem>
                          <SelectItem value="demo-requested">Demo Requested</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="bg-green-600 hover:bg-green-700 hidden md:flex">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 md:hidden">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {farmOwners.map((owner) => (
                    <div key={owner.id} className="flex flex-col space-y-3 p-4 border rounded-lg bg-white md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <Avatar className="w-10 h-10 md:w-12 md:h-12">
                          <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm md:text-base">{owner.name}</h3>
                          <p className="text-xs md:text-sm text-gray-600">{owner.farmName}</p>
                          <p className="text-xs text-gray-500">{owner.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        <div className="flex justify-between md:block md:text-right">
                          <div>
                            <p className="text-xs md:text-sm font-medium">{owner.location}</p>
                            <p className="text-xs text-gray-500">{owner.cowCount} cows</p>
                            <p className="text-xs text-gray-500">Joined {owner.joinedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:flex-col md:items-end md:space-y-2">
                          {getStatusBadge(owner.registrationStage)}
                          <Button variant="outline" size="sm" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          {/* Demo Requests Tab */}
          <TabsContent value="demos" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Demo Requests</CardTitle>
                <CardDescription className="text-sm">Manage and schedule demo requests from potential customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {demoRequests.map((request) => (
                    <div key={request.id} className="flex flex-col space-y-3 p-4 border rounded-lg bg-white md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm md:text-base">{request.farmerName}</h3>
                        <p className="text-xs md:text-sm text-gray-600">{request.farmName}</p>
                        <p className="text-xs text-gray-500">{request.email}</p>
                        <p className="text-xs text-gray-500 mt-1">{request.notes}</p>
                      </div>
                      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        <div className="text-left md:text-right">
                          <p className="text-xs md:text-sm font-medium">Requested: {request.requestDate}</p>
                          <p className="text-xs md:text-sm text-gray-600">Preferred: {request.preferredDate}</p>
                          <p className="text-xs text-gray-500">{request.cowCount} cows</p>
                        </div>
                        <div className="flex items-center justify-between md:flex-col md:items-end md:space-y-2">
                          {getStatusBadge(request.status)}
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              <span className="hidden md:inline">Schedule</span>
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <MessageSquare className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              <span className="hidden md:inline">Contact</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Scheduled Meetings</CardTitle>
                <CardDescription className="text-sm">View and manage upcoming meetings and calls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {scheduledMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex flex-col space-y-3 p-4 border rounded-lg bg-white md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm md:text-base">{meeting.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600">with {meeting.farmer}</p>
                          <p className="text-xs text-gray-500">{meeting.date} at {meeting.time}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        <div className="flex items-center justify-between md:flex-col md:items-end md:space-y-2">
                          <Badge variant="outline" className="capitalize text-xs">
                            {meeting.type}
                          </Badge>
                          {getStatusBadge(meeting.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-xs flex-1 md:flex-none">
                            Join Call
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs flex-1 md:flex-none">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4 md:space-y-6">
            <AnalyticsCharts />
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">System Status</CardTitle>
                  <CardDescription className="text-sm">Monitor platform health and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">API Services</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Database</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">Email Service</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Degraded</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">IoT Sensors</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Maintenance Actions</CardTitle>
                  <CardDescription className="text-sm">Platform maintenance and administrative tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 md:space-y-3">
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Settings className="w-4 h-4 mr-2" />
                      System Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <UserCheck className="w-4 h-4 mr-2" />
                      User Management
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Backup Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs with mobile-friendly navigation */}
          <TabsContent value="users" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">User Management</CardTitle>
                <CardDescription className="text-sm">Advanced user account management tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 md:py-8">
                  <Button asChild className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                    <Link href="/admin/users">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Reports & Analytics</CardTitle>
                <CardDescription className="text-sm">Generate and download comprehensive reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 md:py-8">
                  <Button asChild className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                    <Link href="/admin/reports">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Reports
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
