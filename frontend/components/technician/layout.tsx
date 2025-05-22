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
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function TechnicianLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      router.push("/technician/profile")
    } else if (action === "Paramètres") {
      router.push("/technician/settings")
    } else if (action === "Aide") {
      router.push("/technician/help")
    } else {
      toast({
        title: "Action de profil",
        description: `Vous avez sélectionné : ${action}`,
      })
    }
  }

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Vous avez consulté vos notifications.",
    })
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-orange-500" />
            <h1 className="text-xl font-semibold text-orange-500">Tunisie Télécom GSM - Technicien</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>

            {/* Desktop Navigation menu */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/technician"
                className={`text-sm font-medium ${pathname === "/technician" ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
              >
                Tableau de bord
              </Link>
              <Link
                href="/technician/interventions"
                className={`text-sm font-medium ${pathname === "/technician/interventions" ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
              >
                Interventions
              </Link>
              <Link
                href="/technician/tickets"
                className={`text-sm font-medium ${pathname === "/technician/tickets" ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
              >
                Tickets d'incidents
              </Link>
              <Link
                href="/technician/sites"
                className={`text-sm font-medium ${pathname === "/technician/sites" ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
              >
                Sites assignés
              </Link>
              <Link
                href="/technician/reports"
                className={`text-sm font-medium ${pathname === "/technician/reports" ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
              >
                Rapports
              </Link>
            </nav>

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
                <DropdownMenuItem>
                  <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">Nouvelle intervention assignée</span>
                    <span className="text-xs text-muted-foreground">Site TUN-GSM-042 - Maintenance préventive</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">Rappel d'intervention</span>
                    <span className="text-xs text-muted-foreground">Intervention prévue demain</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Tool className="h-4 w-4 text-orange-500 mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">Ticket mis à jour</span>
                    <span className="text-xs text-muted-foreground">Ticket #1023 - Statut changé</span>
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
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex text-sm font-medium">
                    {userData?.fullName || "Ahmed Benali"}
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
                  onClick={() => handleNavigation("/technician")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/technician"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Tableau de bord
                </button>
                <button
                  onClick={() => handleNavigation("/technician/interventions")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/technician/interventions"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Interventions
                </button>
                <button
                  onClick={() => handleNavigation("/technician/tickets")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/technician/tickets"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Tickets d'incidents
                </button>
                <button
                  onClick={() => handleNavigation("/technician/sites")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/technician/sites"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Radio className="h-4 w-4" />
                  Sites assignés
                </button>
                <button
                  onClick={() => handleNavigation("/technician/reports")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    pathname === "/technician/reports"
                      ? "bg-orange-100 text-orange-500"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Rapports
                </button>
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userData?.fullName || "Ahmed Benali"}</p>
                  <p className="text-xs text-muted-foreground">Technicien</p>
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
      <main className="flex-1 overflow-auto p-6">{children}</main>
      <Toaster />
    </div>
  )
}
