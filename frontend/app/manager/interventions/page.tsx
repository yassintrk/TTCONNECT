"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ManagerLayout } from "@/components/manager/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreVertical, MapPin, Edit, FileText, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Intervention {
  id: string
  title: string
  site: string
  location: string
  type: "preventive" | "corrective"
  status: "pending" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "critical"
  assignedTo: string
  scheduledDate: string
}

export default function InterventionsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  // Mock data - replace with actual data fetching
  const [interventions, setInterventions] = useState<Intervention[]>([
    {
      id: "1",
      title: "Maintenance préventive trimestrielle",
      site: "Site Tunis Centre",
      location: "Tunis, Avenue Habib Bourguiba",
      type: "preventive",
      status: "completed",
      priority: "medium",
      assignedTo: "Ahmed Benali",
      scheduledDate: "15/05/2025",
    },
    {
      id: "2",
      title: "Remplacement batterie de secours",
      site: "Site Sousse Plage",
      location: "Sousse, Zone touristique",
      type: "corrective",
      status: "in_progress",
      priority: "high",
      assignedTo: "Mohamed Trabelsi",
      scheduledDate: "17/05/2025",
    },
    {
      id: "3",
      title: "Vérification système de refroidissement",
      site: "Site Sfax Industriel",
      location: "Sfax, Zone industrielle",
      type: "preventive",
      status: "pending",
      priority: "low",
      assignedTo: "Fatima Zahra",
      scheduledDate: "20/05/2025",
    },
    {
      id: "4",
      title: "Panne d'alimentation électrique",
      site: "Site Bizerte Port",
      location: "Bizerte, Zone portuaire",
      type: "corrective",
      status: "pending",
      priority: "critical",
      assignedTo: "Non assigné",
      scheduledDate: "Immédiat",
    },
    {
      id: "5",
      title: "Mise à jour logicielle",
      site: "Site Kairouan",
      location: "Kairouan, Centre-ville",
      type: "preventive",
      status: "cancelled",
      priority: "low",
      assignedTo: "Sarah Mansouri",
      scheduledDate: "10/05/2025",
    },
  ])

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
      // Vérifier si l'utilisateur est un manager
      if (user.role !== "manager") {
        router.push("/login")
        return
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "in_progress":
        return "En cours"
      case "completed":
        return "Terminée"
      case "cancelled":
        return "Annulée"
      default:
        return status
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low":
        return "Basse"
      case "medium":
        return "Moyenne"
      case "high":
        return "Haute"
      case "critical":
        return "Critique"
      default:
        return priority
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "preventive":
        return "Préventive"
      case "corrective":
        return "Corrective"
      default:
        return type
    }
  }

  // Filter interventions based on search query and filters
  const filteredInterventions = interventions.filter((intervention) => {
    const matchesSearch =
      intervention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || intervention.status === statusFilter
    const matchesType = typeFilter === "all" || intervention.type === typeFilter
    const matchesPriority = priorityFilter === "all" || intervention.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

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
    <ManagerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Interventions</h1>
            <p className="text-gray-600">Gérez les interventions préventives et correctives</p>
          </div>
          <Link href="/manager/interventions/planifier">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Planifier une intervention
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Input
                  placeholder="Rechercher par titre, site ou emplacement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="preventive">Préventive</option>
                <option value="corrective">Corrective</option>
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">Toutes les priorités</option>
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
                <option value="critical">Critique</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Assigné à</TableHead>
                    <TableHead>Date prévue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterventions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                        Aucune intervention trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInterventions.map((intervention) => (
                      <TableRow key={intervention.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{intervention.title}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{intervention.site}</span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {intervention.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeLabel(intervention.type)}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadgeClass(intervention.priority)}>
                            {getPriorityLabel(intervention.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(intervention.status)}>
                            {getStatusLabel(intervention.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{intervention.assignedTo}</TableCell>
                        <TableCell>{intervention.scheduledDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Voir détails
                              </DropdownMenuItem>
                              {intervention.status === "pending" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Marquer comme en cours
                                </DropdownMenuItem>
                              )}
                              {intervention.status === "in_progress" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Marquer comme terminée
                                </DropdownMenuItem>
                              )}
                              {(intervention.status === "pending" || intervention.status === "in_progress") && (
                                <DropdownMenuItem>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Annuler
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  )
}
