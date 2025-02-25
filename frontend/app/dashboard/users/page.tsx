//dashboard/users.tsx
"use client"

import { useRouter } from "next/navigation"

export default function Users() {
  const router = useRouter()

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Viewer" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <nav>
          <ul>
            <li className="mb-2">
              <button onClick={() => router.push("/dashboard")} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => router.push("/dashboard/users")} className="w-full text-left py-2 px-4 rounded bg-blue-600">
                Users
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => router.push("/dashboard/reports")} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
                Reports
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Users Management</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
