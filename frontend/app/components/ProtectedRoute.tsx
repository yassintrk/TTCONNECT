"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
// import { isAuthenticated } from "@/lib/auth"
const isAuthenticated = () => {
    // Temporary mock implementation
    // Replace with real authentication logic or import when available
    return typeof window !== "undefined" && !!localStorage.getItem("token")
}

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      router.push("/login")
    }
  }, [router])

  // If we're on the client side and the user is not authenticated,
  // return null to prevent flash of protected content
  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  // If user is authenticated, render children
  return <>{children}</>
}
