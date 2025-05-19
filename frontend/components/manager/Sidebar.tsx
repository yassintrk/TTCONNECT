"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Antenna,
  PenToolIcon as Tool,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")

    // Rediriger vers la page de connexion
    router.push("/login")
  }

  const navItems = [
    {
      title: "Tableau de bord",
      href: "/manager",
      icon: LayoutDashboard,
    },
    {
      title: "Sites GSM",
      href: "/manager/sites",
      icon: Antenna,
    },
    {
      title: "Interventions",
      href: "/manager/interventions",
      icon: Tool,
    },
    {
      title: "Rapports",
      href: "/manager/reports",
      icon: FileText,
    },
    {
      title: "Paramètres",
      href: "/manager/settings",
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gray-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && <h1 className="text-xl font-bold">GSM Manager</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors",
                pathname === item.href ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center px-3 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full",
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  )
}
