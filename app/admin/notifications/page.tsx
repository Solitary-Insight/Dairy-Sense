"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertTriangle, CheckCircle, Info, X, BookMarkedIcon as MarkAsUnread, Archive, Settings, ArrowLeft } from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "System Maintenance Required",
    message: "Database backup scheduled for tonight at 2:00 AM EST",
    timestamp: "2024-01-28 14:30",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    type: "user",
    title: "New Demo Request",
    message: "Sarah Wilson from Wilson Family Farms requested a demo",
    timestamp: "2024-01-28 13:15",
    read: false,
    priority: "medium",
    avatar: "/placeholder.svg?height=32&width=32"
  },
  {
    id: 3,
    type: "system",
    title: "Registration Completed",
    message: "John Smith has completed farm registration and setup",
    timestamp: "2024-01-28 11:45",
    read: true,
    priority: "low"
  },
  {
    id: 4,
    type: "alert",
    title: "Email Service Degraded",
    message: "Email delivery experiencing delays. Investigating issue.",
    timestamp: "2024-01-28 10:20",
    read: false,
    priority: "high"
  },
  {
    id: 5,
    type: "user",
    title: "Meeting Rescheduled",
    message: "Lisa Anderson rescheduled demo from Feb 3 to Feb 5",
    timestamp: "2024-01-28 09:30",
    read: true,
    priority: "medium",
    avatar: "/placeholder.svg?height=32&width=32"
  }
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [filter, setFilter] = useState("all")

  const getNotificationIcon = (type: string, priority: string) => {
    if (type === "alert" && priority === "high") {
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
    if (type === "system") {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    return <Info className="w-5 h-5 text-blue-500" />
  }

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAsUnread = (id: number) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: false } : notif
      )
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notificationList.filter(notif => {
    if (filter === "unread") return !notif.read
    if (filter === "alerts") return notif.type === "alert"
    if (filter === "users") return notif.type === "user"
    return true
  })

  const unreadCount = notificationList.filter(n => !n.read).length

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
                <span className="text-xl font-semibold text-gray-900">DairySense Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">{unreadCount} unread</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive All Read
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({notificationList.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="users">User Activity</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-600">You're all caught up!</p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-green-500 bg-green-50/30' : 'bg-white'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {notification.avatar ? (
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center">
                              {getNotificationIcon(notification.type, notification.priority)}
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                              <Badge 
                                variant={notification.priority === 'high' ? 'destructive' : notification.priority === 'medium' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          {notification.read ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsUnread(notification.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MarkAsUnread className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
