"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home, Users, Bell, LogOut, AlertTriangle, FileText, BarChart3 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Vérification de l'authentification
    const adminToken = localStorage.getItem("adminToken")
    const adminUser = localStorage.getItem("adminUser")

    if (!adminToken || !adminUser) {
      router.push("/")
      return
    }

    try {
      const userData = JSON.parse(adminUser)

      // Vérification du rôle admin
      if (userData.role !== "admin") {
        router.push("/")
        return
      }

      setUser(userData)
    } catch (error) {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
      router.push("/")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Portal</h2>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <Link href="/admin" className="flex items-center px-4 py-2 text-sm rounded-md bg-gray-900 text-orange-400">
              <Home className="mr-3 h-5 w-5" />
              Tableau de bord
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
            >
              <Users className="mr-3 h-5 w-5" />
              Utilisateurs
            </Link>

            <Link
              href="/admin/alerts"
              className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
            >
              <AlertTriangle className="mr-3 h-5 w-5" />
              Alertes de sécurité
            </Link>

            <Link
              href="/admin/reports"
              className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
            >
              <FileText className="mr-3 h-5 w-5" />
              Rapports
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytiques
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700 w-full"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="md:hidden">
                <button
                  type="button"
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                  <span className="sr-only">Ouvrir le menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-gray-800">Portail Administrateur</h1>
              </div>

              <div className="flex items-center">
                <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">{user.username}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
