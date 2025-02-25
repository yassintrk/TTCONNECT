//Dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const adminUser = localStorage.getItem("adminUser")
      if (!adminUser) {
        router.push("/")
      } else {
        setUser(JSON.parse(adminUser))
      }
    } catch (error) {
      console.error("Error parsing adminUser:", error)
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image className="h-8 w-auto" src="/ttlogo.png" alt="Company Logo" width={32} height={32} />
              <span className="ml-2 text-xl font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
          {/* Add more dashboard content here */}
        </div>
      </main>
    </div>
  )
}

