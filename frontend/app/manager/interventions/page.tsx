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
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash2,
  AlertTriangle,
  CheckCircle,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock data for interventions
const mockInterventions = [
  {
    id: "INT-2023-042",
    title: "Maintenance préventive - Site TUN-GSM-042",
    siteId: "TUN-GSM-042",
    siteName: "Tunis Centre",
    type: "maintenance",
    priority: "medium",
    status: "scheduled",
    scheduledDate: "2023-05-20",
    scheduledTime: "09:00",
    assignedTechnicians: ["TECH-001", "TECH-003"],
    createdAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "INT-2023-043",
    title: "Réparation antenne - Site SFX-GSM-118",
    siteId: "SFX-GSM-118",
    siteName: "Sfax Nord",
    type: "repair",
    priority: "high",
    status: "in_progress",
    scheduledDate: "2023-05-18",
    scheduledTime: "10:30",
    assignedTechnicians: ["TECH-002", "TECH-004"],
    createdAt: "2023-05-11T09:15:00Z",
  },
  {
    id: "INT-2023-044",
    title: "Installation nouvel équipement - Site NBL-GSM-073",
    siteId: "NBL-GSM-073",
    siteName: "Nabeul Est",
    type: "installation",
    priority: "medium",
    status: "completed",
    scheduledDate: "2023-05-15",
    scheduledTime: "08:00",
    assignedTechnicians: ["TECH-001", "TECH-005"],
    createdAt: "2023-05-08T11:45:00Z",
  },
  {
    id: "INT-2023-045",
    title: "Mise à niveau logicielle - Site BZT-GSM-091",
    siteId: "BZT-GSM-091",
    siteName: "Bizerte Port",
    type: "upgrade",
    priority: "low",
    status: "scheduled",
    scheduledDate: "2023-05-25",
    scheduledTime: "14:00",
    assignedTechnicians: ["TECH-003"],
    createdAt: "2023-05-12T16:20:00Z",
  },
  {
    id: "INT-2023-046",
    title: "Inspection trimestrielle - Site SUS-GSM-054",
    siteId: "SUS-GSM-054",
    siteName: "Sousse Plage",
    type: "inspection",
    priority: "low",
    status: "cancelled",
    scheduledDate: "2023-05-17",
    scheduledTime: "11:00",
    assignedTechnicians: ["TECH-002"],
    createdAt: "2023-05-09T10:30:00Z",
  },
  {
    id: "INT-2023-047",
    title: "Réparation urgente - Site TUN-GSM-042",
    siteId: "TUN-GSM-042",
    siteName: "Tunis Centre",
    type: "repair",
    priority: "critical",
    status: "completed",
    scheduledDate: "2023-05-12",
    scheduledTime: "07:30",
    assignedTechnicians: ["TECH-001", "TECH-004", "TECH-005"],
    createdAt: "2023-05-12T06:15:00Z",
  },
  {
    id: "INT-2023-048",
    title: "Maintenance préventive - Site SFX-GSM-118",
    siteId: "SFX-GSM-118",
    siteName: "Sfax Nord",
    type: "maintenance",
    priority: "medium",
    status: "archived",
    scheduledDate: "2023-04-20",
    scheduledTime: "09:00",
    assignedTechnicians: ["TECH-002", "TECH-003"],
    createdAt: "2023-04-10T14:30:00Z",
  },
]

// Mock data for technicians
const mockTechnicians = [
  { id: "TECH-001", name: "Ahmed Benali", specialization: "Radio" },
  { id: "TECH-002", name: "Sami Trabelsi", specialization: "Transmission" },
  { id: "TECH-003", name: "Leila Mansour", specialization: "Énergie" },
  { id: "TECH-004", name: "Karim Mejri", specialization: "Antennes" },
  { id: "TECH-005", name: "Nadia Bouazizi", specialization: "Fibre optique" },
]

export default function InterventionsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [interventions, setInterventions] = useState(mockInterventions)

  // Archive dialog
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false)
  const [interventionToArchive, setInterventionToArchive] = useState<any>(null)

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
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-amber-100 text-amber-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Planifiée"
      case "in_progress":
        return "En cours"
      case "completed":
        return "Terminée"
      case "cancelled":
        return "Annulée"
      case "archived":
        return "Archivée"
      default:
        return status
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
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
      case "installation":
        return "Installation"
      case "maintenance":
        return "Maintenance"
      case "repair":
        return "Réparation"
      case "upgrade":
        return "Mise à niveau"
      case "inspection":
        return "Inspection"
      default:
        return type
    }
  }

  const getTechnicianNames = (techIds: string[]) => {
    return techIds
      .map((id) => {
        const tech = mockTechnicians.find((t) => t.id === id)
        return tech ? tech.name : id
      })
      .join(", ")
  }

  // Filter interventions based on search query and filters
  const filteredInterventions = interventions.filter((intervention) => {
    const matchesSearch =
      intervention.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.siteId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || intervention.status === statusFilter
    const matchesType = typeFilter === "all" || intervention.type === typeFilter
    const matchesPriority = priorityFilter === "all" || intervention.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  // Handle archive intervention
  const openArchiveDialog = (intervention: any) => {
    setInterventionToArchive(intervention)
    setIsArchiveDialogOpen(true)
  }

  const handleArchiveIntervention = () => {
    if (!interventionToArchive) return

    // Update intervention status to archived
    const updatedInterventions = interventions.map((intervention) =>
      intervention.id === interventionToArchive.id ? { ...intervention, status: "archived" } : intervention,
    )

    setInterventions(updatedInterventions)
    setIsArchiveDialogOpen(false)

    toast({
      title: "Intervention archivée",
      description: `L'intervention ${interventionToArchive.title} a été archivée avec succès.`,
    })
  }

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }

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
            <p className="text-gray-600">Gérez les interventions sur les sites GSM</p>
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
                  placeholder="Rechercher par ID, titre ou site..."
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
                <option value="scheduled">Planifiée</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
                <option value="archived">Archivée</option>
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="installation">Installation</option>
                <option value="maintenance">Maintenance</option>
                <option value="repair">Réparation</option>
                <option value="upgrade">Mise à niveau</option>
                <option value="inspection">Inspection</option>
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
                    <TableHead>ID</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Techniciens</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterventions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                        Aucune intervention trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInterventions.map((intervention) => (
                      <TableRow key={intervention.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{intervention.id}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">{intervention.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{intervention.siteName}</span>
                            <span className="text-xs text-gray-500">{intervention.siteId}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeLabel(intervention.type)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{formatDate(intervention.scheduledDate)}</span>
                            <span className="text-xs text-gray-500">{intervention.scheduledTime}</span>
                          </div>
                        </TableCell>
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
                        <TableCell>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm">{intervention.assignedTechnicians.length}</span>
                            <span className="text-xs text-gray-500 ml-1 hidden md:inline">
                              ({getTechnicianNames(intervention.assignedTechnicians)})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => router.push(`/manager/interventions/edit/${intervention.id}`)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Voir détails
                              </DropdownMenuItem>
                              {intervention.status !== "archived" && (
                                <DropdownMenuItem onClick={() => openArchiveDialog(intervention)}>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archiver
                                </DropdownMenuItem>
                              )}
                              {intervention.status === "archived" && (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer définitivement
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Marquer comme terminée
                              </DropdownMenuItem>
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

      {/* Archive Dialog */}
      <Dialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archiver l'intervention</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir archiver cette intervention ? Cette action ne supprimera pas l'intervention, mais
              la marquera comme archivée.
            </DialogDescription>
          </DialogHeader>

          {interventionToArchive && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <p className="font-medium">Informations de l'intervention</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p>
                  <span className="font-medium">ID:</span> {interventionToArchive.id}
                </p>
                <p>
                  <span className="font-medium">Titre:</span> {interventionToArchive.title}
                </p>
                <p>
                  <span className="font-medium">Site:</span> {interventionToArchive.siteName} (
                  {interventionToArchive.siteId})
                </p>
                <p>
                  <span className="font-medium">Date prévue:</span> {formatDate(interventionToArchive.scheduledDate)} à{" "}
                  {interventionToArchive.scheduledTime}
                </p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Une intervention archivée n'apparaîtra plus dans les listes principales mais restera accessible dans les
                archives. Les techniciens assignés seront notifiés de ce changement.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArchiveDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleArchiveIntervention}>
              <Archive className="h-4 w-4 mr-2" />
              Archiver l'intervention
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ManagerLayout>
  )
}
