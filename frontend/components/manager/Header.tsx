"use client"

import { useState } from "react"
import { Bell, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Header() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nouvelle intervention assignée",
      description: "Une intervention corrective a été assignée au site Tunis Centre",
      time: "Il y a 10 minutes",
      read: false,
    },
    {
      id: 2,
      title: "Rapport mensuel disponible",
      description: "Le rapport mensuel d'avril 2025 est maintenant disponible",
      time: "Il y a 2 heures",
      read: false,
    },
    {
      id: 3,
      title: "Maintenance terminée",
      description: "La maintenance du site Sousse Plage a été complétée avec succès",
      time: "Hier",
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-end">
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium border-b">Notifications</div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">Aucune notification</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b last:border-0 ${!notification.read ? "bg-blue-50" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-600">{notification.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                  </div>
                ))
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/manager/notifications" className="w-full text-center text-blue-600">
                Voir toutes les notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">N</div>
              <div className="hidden md:block text-left">
                <div className="font-medium">Nidhal Nsiri</div>
                <div className="text-xs text-gray-500">Manager</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/manager/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Mon profil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/manager/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/login"
                className="cursor-pointer text-red-600"
                onClick={() => {
                  localStorage.removeItem("adminToken")
                  localStorage.removeItem("adminUser")
                }}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
