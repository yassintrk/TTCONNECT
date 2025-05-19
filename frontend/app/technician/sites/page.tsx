"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TechnicianLayout } from "@/components/technician/layout"
import { SitesList } from "@/components/technician/sites-list"

export default function SitesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const token = localStorage.getItem("adminToken")
    const userStr = localStorage.getItem("adminUser")

    if (!token || !userStr) {
      router.push("/login")
      return
    }

    try {
      const user = JSON.parse(userStr)
      // Vérifier si l'utilisateur est un technicien
      if (user.role !== "technician") {
        router.push("/login")
        return
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <TechnicianLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sites Assignés</h2>
          <p className="text-muted-foreground">Sites GSM sous votre responsabilité</p>
        </div>
        <SitesList />
      </div>
    </TechnicianLayout>
  )
}
