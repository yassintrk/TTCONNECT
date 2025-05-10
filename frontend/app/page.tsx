"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Login from "./components/Login"
import AnimatedBackground from "./components/AnimatedBackground"

export default function AdminAuth() {
  const router = useRouter()

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken")
    if (adminToken) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <Image
            className="mx-auto h-12 w-auto"
            src="/ttlogo.png"
            alt="Company Logo"
            width={150}
            height={48}
            priority
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Admin Portal</h2>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <Login />
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
}
