"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function ManagerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userData, setUserData] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-orange-500" />
            <h1 className="text-xl font-semibold text-orange-500">Tunisie Télécom GSM - Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>

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

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[250px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-orange-500">Tunisie Télécom GSM</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-1 px-2">
                <button
                  onClick={() => handleNavigation("/manager")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/manager" ? "bg-orange-100 text-orange-500" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Tableau de bord
                </button>
                <button
                  onClick={() => handleNavigation("/manager/interventions")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname.startsWith("/manager/interventions") && pathname !== "/manager/interventions/planifier"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Interventions
                </button>
                <button
                  onClick={() => handleNavigation("/manager/interventions/planifier")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md pl-9 ${
                    pathname === "/manager/interventions/planifier"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  Planifier une intervention
                </button>
                <button
                  onClick={() => handleNavigation("/manager/sites")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname.startsWith("/manager/sites")
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Radio className="h-4 w-4" />
                  Sites GSM
                </button>
                <button
                  onClick={() => handleNavigation("/manager/reports")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/manager/reports"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                  Rapports
                </button>
                <button
                  onClick={() => handleNavigation("/manager/map")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/manager/map"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Map className="h-4 w-4" />
                  Carte des sites
                </button>
                <button
                  onClick={() => handleNavigation("/manager/notifications")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/manager/notifications"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </button>
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>NN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userData?.fullName || "Nidhal Nsiri"}</p>
                  <p className="text-xs text-muted-foreground">Manager</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleProfileAction("Déconnexion")
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md w-full text-muted-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 mt-16">{children}</main>
      <Toaster />
    </div>
  )
}
