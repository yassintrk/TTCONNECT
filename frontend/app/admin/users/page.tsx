"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditUserModal, type User } from "./edit-user-modal"
import Link from "next/link"
import { Lock, Unlock, Filter, Plus, Pencil, UserX } from "lucide-react"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("Tous les rôles")
  const [selectedStatus, setSelectedStatus] = useState<string>("Tous les statuts")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Mock data - replace with your actual data fetching logic
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      nom: "Ahmed Benali",
      email: "ahmed.benali@example.com",
      role: "Technicien",
      site: "Site A",
      status: "actif",
    },
    {
      id: "2",
      nom: "Sarah Mansouri",
      email: "sarah.mansouri@example.com",
      role: "Manager",
      site: "-",
      status: "actif",
    },
    {
      id: "3",
      nom: "Mohamed Trabelsi",
      email: "mohamed.trabelsi@example.com",
      role: "Technicien",
      site: "Site B",
      status: "inactif",
    },
    {
      id: "4",
      nom: "Fatima Zahra",
      email: "fatima.zahra@example.com",
      role: "Technicien",
      site: "Site C",
      status: "verrouillé",
    },
  ])

  // Function to handle editing a user
  const handleEditUser = (user: User) => {
    setSelectedUser({ ...user })
    setEditModalOpen(true)
  }

  // Function to refresh the user list after an update
  const handleUserUpdated = () => {
    // In a real application, you would refetch the users from your API
    // For this example, we'll just update the local state with the edited user
    if (selectedUser) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...selectedUser } : user)))
    }
  }

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === "Tous les rôles" || user.role === selectedRole
    const matchesStatus = selectedStatus === "Tous les statuts" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les techniciens et les managers</p>
        </div>
        <Link href="/admin/users/add">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les rôles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous les rôles">Tous les rôles</SelectItem>
              <SelectItem value="Technicien">Technicien</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous les statuts">Tous les statuts</SelectItem>
              <SelectItem value="actif">Actif</SelectItem>
              <SelectItem value="inactif">Inactif</SelectItem>
              <SelectItem value="verrouillé">Verrouillé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">NOM</th>
                <th className="text-left py-3 px-4 font-medium">EMAIL</th>
                <th className="text-left py-3 px-4 font-medium">RÔLE</th>
                <th className="text-left py-3 px-4 font-medium">SITE</th>
                <th className="text-left py-3 px-4 font-medium">STATUT</th>
                <th className="text-left py-3 px-4 font-medium">DERNIÈRE CONNEXION</th>
                <th className="text-left py-3 px-4 font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.nom}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.site}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        user.status === "actif"
                          ? "bg-green-100 text-green-800"
                          : user.status === "inactif"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.id === "1"
                      ? "Il y a 2 heures"
                      : user.id === "2"
                        ? "Il y a 1 jour"
                        : user.id === "3"
                          ? "Il y a 30 jours"
                          : "Il y a 5 jours"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditUser(user)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        {user.status === "verrouillé" ? (
                          <>
                            <Unlock className="h-4 w-4" />
                            Déverrouiller
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" />
                            Verrouiller
                          </>
                        )}
                      </Button>
                      <Button variant="destructive" size="sm" className="flex items-center gap-1">
                        <UserX className="h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <div className="text-sm text-gray-500">Page 1 sur 1</div>
          <Button variant="outline" size="sm" disabled>
            Suivant
          </Button>
        </div>
      </div>

      {/* Edit User Modal */}
      {editModalOpen && (
        <EditUserModal
          user={selectedUser}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onUserUpdated={() => {
            // Update the user in the list
            if (selectedUser) {
              setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)))
            }
          }}
        />
      )}
    </div>
  )
}

