//dashboard/reports.tsx
"use client"

import { useRouter } from "next/navigation"

export default function Reports() {
  const router = useRouter()

  const reports = [
    { id: 1, title: "Monthly Sales Report", date: "Feb 2025", status: "Completed" },
    { id: 2, title: "User Activity Report", date: "Jan 2025", status: "Pending" },
    { id: 3, title: "System Performance Report", date: "Dec 2024", status: "Completed" },
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
              <button onClick={() => router.push("/dashboard/users")} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
                Users
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => router.push("/dashboard/reports")} className="w-full text-left py-2 px-4 rounded bg-blue-600">
                Reports
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Reports</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <ul>
            {reports.map((report) => (
              <li key={report.id} className="border-b border-gray-700 py-2">
                <strong>{report.title}</strong> - {report.date} - <span className="text-green-400">{report.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
