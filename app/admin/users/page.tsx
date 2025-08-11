"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeft, Search, Filter, MoreHorizontal, Edit, Trash2, Mail, Phone, MapPin, Calendar, MilkIcon as Cow, AlertCircle, CheckCircle, Clock, Ban, Menu } from 'lucide-react'

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@smithfarm.com",
    phone: "+1 (555) 123-4567",
    farmName: "Smith Dairy Farm",
    location: "Wisconsin, USA",
    cowCount: 150,
    registrationDate: "2024-01-15",
    lastLogin: "2024-01-28 09:30",
    status: "active",
    subscription: "premium",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Large operation, very satisfied customer"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@valleyfarm.com",
    phone: "+1 (555) 234-5678",
    farmName: "Valley Green Farm",
    location: "California, USA",
    cowCount: 200,
    registrationDate: "2024-01-20",
    lastLogin: "2024-01-27 14:15",
    status: "pending",
    subscription: "basic",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Waiting for equipment installation"
  },
  {
    id: 3,
    name: "David Johnson",
    email: "david@johnsondairy.com",
    phone: "+1 (555) 345-6789",
    farmName: "Johnson Dairy Co.",
    location: "Texas, USA",
    cowCount: 300,
    registrationDate: "2024-01-22",
    lastLogin: "2024-01-28 11:45",
    status: "active",
    subscription: "enterprise",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Enterprise customer, multiple locations"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@wilsonfarms.com",
    phone: "+1 (555) 456-7890",
    farmName: "Wilson Family Farms",
    location: "Vermont, USA",
    cowCount: 75,
    registrationDate: "2024-01-25",
    lastLogin: "Never",
    status: "inactive",
    subscription: "trial",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Trial expired, needs follow-up"
  }
]

export default function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "active": { label: "Active", color: "bg-green-100 text-green-800", icon: CheckCircle },
      "pending": { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      "inactive": { label: "Inactive", color: "bg-gray-100 text-gray-800", icon: AlertCircle },
      "suspended": { label: "Suspended", color: "bg-red-100 text-red-800", icon: Ban }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getSubscriptionBadge = (subscription: string) => {
    const subConfig = {
      "trial": { label: "Trial", color: "bg-blue-100 text-blue-800" },
      "basic": { label: "Basic", color: "bg-green-100 text-green-800" },
      "premium": { label: "Premium", color: "bg-purple-100 text-purple-800" },
      "enterprise": { label: "Enterprise", color: "bg-orange-100 text-orange-800" }
    }
    
    const config = subConfig[subscription as keyof typeof subConfig] || subConfig.basic
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id))
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.farmName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesSubscription = subscriptionFilter === "all" || user.subscription === subscriptionFilter
    
    return matchesSearch && matchesStatus && matchesSubscription
  })

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="ghost" asChild size="sm">
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Back to Dashboard</span>
                  <span className="md:hidden">Back</span>
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs md:text-sm">D</span>
                </div>
                <span className="text-lg md:text-xl font-semibold text-gray-900">User Management</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="space-y-4 md:space-y-6">
          {/* Filters and Actions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle className="text-lg md:text-xl">Farm Owners ({filteredUsers.length})</CardTitle>
                  <CardDescription className="text-sm">Manage user accounts and subscriptions</CardDescription>
                </div>
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg md:mr-4">
                      <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
                      <div className="flex space-x-2 ml-2">
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-1" />
                          <span className="hidden md:inline">Email</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <span className="hidden md:inline">Export</span>
                          <span className="md:hidden">Export</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                    <span className="md:hidden">Add User</span>
                    <span className="hidden md:inline">Add New User</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile Filter Toggle */}
              <div className="md:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Filters */}
              <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 mb-6`}>
                <div className="relative flex-1 md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Desktop Table Header */}
              <div className="hidden md:flex items-center space-x-4 p-3 border-b bg-gray-50 rounded-t-lg">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={handleSelectAll}
                />
                <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                  <span>User</span>
                  <span>Farm Details</span>
                  <span>Contact</span>
                  <span>Status</span>
                  <span>Subscription</span>
                  <span>Actions</span>
                </div>
              </div>

              {/* Users List */}
              <div className="space-y-3 md:space-y-0">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex flex-col space-y-3 p-4 border rounded-lg bg-white md:flex-row md:items-center md:space-y-0 md:space-x-4 md:rounded-none md:border-x-0 md:border-t-0 hover:bg-gray-50">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleSelectUser(user.id)}
                          />
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-sm">{user.name}</h3>
                            <p className="text-xs text-gray-600">{user.farmName}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {getStatusBadge(user.status)}
                          {getSubscriptionBadge(user.subscription)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                        <div>
                          <p className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </p>
                          <p className="flex items-center mt-1">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {user.location}
                          </p>
                          <p className="flex items-center mt-1">
                            <Cow className="w-3 h-3 mr-1" />
                            {user.cowCount} cows
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          Last login: {user.lastLogin === "Never" ? "Never" : user.lastLogin}
                        </p>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl mx-4">
                              <DialogHeader>
                                <DialogTitle>Edit User: {user.name}</DialogTitle>
                                <DialogDescription>
                                  Update user information and account settings
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-96 overflow-y-auto">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Full Name</Label>
                                  <Input id="name" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" defaultValue={user.email} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone</Label>
                                  <Input id="phone" defaultValue={user.phone} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="farmName">Farm Name</Label>
                                  <Input id="farmName" defaultValue={user.farmName} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="location">Location</Label>
                                  <Input id="location" defaultValue={user.location} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cowCount">Cow Count</Label>
                                  <Input id="cowCount" type="number" defaultValue={user.cowCount} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="status">Status</Label>
                                  <Select defaultValue={user.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                      <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="subscription">Subscription</Label>
                                  <Select defaultValue={user.subscription}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="trial">Trial</SelectItem>
                                      <SelectItem value="basic">Basic</SelectItem>
                                      <SelectItem value="premium">Premium</SelectItem>
                                      <SelectItem value="enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                  <Label htmlFor="notes">Notes</Label>
                                  <Textarea id="notes" defaultValue={user.notes} rows={3} />
                                </div>
                              </div>
                              <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
                                <Button variant="outline" className="w-full md:w-auto">Cancel</Button>
                                <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">Save Changes</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex md:items-center md:space-x-4 md:flex-1">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                      <div className="flex-1 grid grid-cols-6 gap-4">
                        {/* User Info */}
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-sm">{user.name}</h3>
                            <p className="text-xs text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>

                        {/* Farm Details */}
                        <div>
                          <p className="font-medium text-sm">{user.farmName}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {user.location}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Cow className="w-3 h-3 mr-1" />
                            {user.cowCount} cows
                          </div>
                        </div>

                        {/* Contact */}
                        <div>
                          <p className="text-sm">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.phone}</p>
                          <p className="text-xs text-gray-500">
                            Last login: {user.lastLogin === "Never" ? "Never" : user.lastLogin}
                          </p>
                        </div>

                        {/* Status */}
                        <div>
                          {getStatusBadge(user.status)}
                          <p className="text-xs text-gray-500 mt-1">
                            Joined {user.registrationDate}
                          </p>
                        </div>

                        {/* Subscription */}
                        <div>
                          {getSubscriptionBadge(user.subscription)}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit User: {user.name}</DialogTitle>
                                <DialogDescription>
                                  Update user information and account settings
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Full Name</Label>
                                  <Input id="name" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" defaultValue={user.email} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone</Label>
                                  <Input id="phone" defaultValue={user.phone} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="farmName">Farm Name</Label>
                                  <Input id="farmName" defaultValue={user.farmName} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="location">Location</Label>
                                  <Input id="location" defaultValue={user.location} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cowCount">Cow Count</Label>
                                  <Input id="cowCount" type="number" defaultValue={user.cowCount} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="status">Status</Label>
                                  <Select defaultValue={user.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                      <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="subscription">Subscription</Label>
                                  <Select defaultValue={user.subscription}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="trial">Trial</SelectItem>
                                      <SelectItem value="basic">Basic</SelectItem>
                                      <SelectItem value="premium">Premium</SelectItem>
                                      <SelectItem value="enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                  <Label htmlFor="notes">Notes</Label>
                                  <Textarea id="notes" defaultValue={user.notes} rows={3} />
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
