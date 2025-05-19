"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Calendar,
  ChevronDown,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Radio,
  Settings,
  PenToolIcon as Tool,
  User,
  AlertTriangle,
  BarChart,
  Map,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function ManagerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem("adminUser")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserData(user)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleProfileAction = (action: string) => {
    if (action === "Déconnexion") {
      // Remove token from localStorage
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")

      // Show toast before redirect
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès.",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } else if (action === "Profil") {
      router.push("/manager/profile")
    } else if (action === "Paramètres") {
      router.push("/manager/settings")
    } else if (action === "Aide") {
      router.push("/manager/help")
    } else {
      toast({
        title: "Action de profil",
        description: `Vous avez sélectionné : ${action}`,
      })
    }
  }

  const handleNotifications = () => {
    router.push("/manager/notifications")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <MobileSidebar pathname={pathname} onClose={() => setIsSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
        <DesktopSidebar pathname={pathname} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-orange-500" />
              <h1 className="text-xl font-semibold text-orange-500">Tunisie Télécom GSM - Manager</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" onClick={handleNotifications}>
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/manager/notifications")}>
                    <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">Nouveau ticket urgent</span>
                      <span className="text-xs text-muted-foreground">Site TUN-GSM-042 - Panne d'alimentation</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/manager/notifications")}>
                    <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">Intervention terminée</span>
                      <span className="text-xs text-muted-foreground">Site NBL-GSM-073 - Remplacement RRU</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/manager/notifications")}>
                    <Tool className="h-4 w-4 text-orange-500 mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">Mise à jour d'intervention</span>
                      <span className="text-xs text-muted-foreground">Site SFX-GSM-118 - Statut changé</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profil utilisateur */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>NN</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex text-sm font-medium">
                      {userData?.fullName || "Nidhal Nsiri"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleProfileAction("Profil")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileAction("Paramètres")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileAction("Aide")}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Aide</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileAction("Déconnexion")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
        <Toaster />
      </div>
    </div>
  )
}

// Mobile Sidebar Component
function MobileSidebar({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Radio className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500">Tunisie Télécom GSM</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <button
            onClick={() => handleNavigation("/manager")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            Tableau de bord
          </button>
          <button
            onClick={() => handleNavigation("/manager/interventions")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              pathname.startsWith("/manager/interventions")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Calendar className="h-5 w-5" />
            Interventions
          </button>
          <button
            onClick={() => handleNavigation("/manager/interventions/planifier")}
            className={`flex items-center gap-3 rounded-lg pl-10 py-2 transition-all text-xs ${
              isActive("/manager/interventions/planifier")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Plus className="h-4 w-4" />
            Planifier une intervention
          </button>
          <button
            onClick={() => handleNavigation("/manager/sites")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              pathname.startsWith("/manager/sites")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Radio className="h-5 w-5" />
            Sites GSM
          </button>
          <button
            onClick={() => handleNavigation("/manager/reports")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager/reports")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <BarChart className="h-5 w-5" />
            Rapports
          </button>
          <button
            onClick={() => handleNavigation("/manager/map")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager/map")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Map className="h-5 w-5" />
            Carte des sites
          </button>
          <button
            onClick={() => handleNavigation("/manager/notifications")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager/notifications")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Bell className="h-5 w-5" />
            Notifications
          </button>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <button
          onClick={() => handleNavigation("/manager/profile")}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 w-full text-left transition-all ${
            isActive("/manager/profile")
              ? "text-orange-500"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          Profil
        </button>
        <button
          onClick={() => handleNavigation("/manager/settings")}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 w-full text-left transition-all ${
            isActive("/manager/settings")
              ? "text-orange-500"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </button>
      </div>
    </div>
  )
}

// Desktop Sidebar Component
function DesktopSidebar({ pathname }: { pathname: string }) {
  const isActive = (path: string) => {
    return pathname === path
  }

  const isActiveStartsWith = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/manager" className="flex items-center gap-2 font-semibold">
          <Radio className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500">Tunisie Télécom GSM</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/manager"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            Tableau de bord
          </Link>
          <div className="space-y-1">
            <Link
              href="/manager/interventions"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActiveStartsWith("/manager/interventions")
                  ? "text-orange-500"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Calendar className="h-5 w-5" />
              Interventions
            </Link>
            <Link
              href="/manager/interventions/planifier"
              className={`flex items-center gap-3 rounded-lg pl-10 py-2 transition-all text-xs ${
                isActive("/manager/interventions/planifier")
                  ? "text-orange-500"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Plus className="h-4 w-4" />
              Planifier une intervention
            </Link>
          </div>
          <Link
            href="/manager/sites"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActiveStartsWith("/manager/sites")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Radio className="h-5 w-5" />
            Sites GSM
          </Link>
          <Link
            href="/manager/reports"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager/reports")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <BarChart className="h-5 w-5" />
            Rapports
          </Link>
          <Link
            href="/manager/map"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager/map")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Map className="h-5 w-5" />
            Carte des sites
          </Link>
          <Link
            href="/manager/notifications"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("/manager/notifications")
                ? "text-orange-500"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="/manager/profile"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/manager/profile")
              ? "text-orange-500"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          Profil
        </Link>
        <Link
          href="/manager/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/manager/settings")
              ? "text-orange-500"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </Link>
      </div>
    </div>
  )
}
