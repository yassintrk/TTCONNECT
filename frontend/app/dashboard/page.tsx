//dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()

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
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>
  }

  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Reports", href: "/dashboard/reports" },
    { name: "Settings", href: "/dashboard/settings" }
  ]

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <div className="flex items-center space-x-2">
          <Image src="/ttlogo.png" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`block py-2 px-4 rounded ${
                    pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>

        {/* User Info Section */}
        <div className="bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-2">1,245</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Active Sessions</h3>
            <p className="text-3xl font-bold mt-2">58</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">New Notifications</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">User</th>
                  <th className="py-2 px-4">Action</th>
                  <th className="py-2 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">Logged in</td>
                  <td className="py-2 px-4">Feb 25, 2025 10:30 AM</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4">Updated settings</td>
                  <td className="py-2 px-4">Feb 24, 2025 5:20 PM</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Admin</td>
                  <td className="py-2 px-4">Created a new user</td>
                  <td className="py-2 px-4">Feb 23, 2025 3:15 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/dashboard/users")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Manage Users
          </button>
          <button
            onClick={() => router.push("/dashboard/reports")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            View Reports
          </button>
          <button
            onClick={() => router.push("/dashboard/settings")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
          >
            System Settings
          </button>
        </div>
      </main>
    </div>
  )
}
