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
  MapPin,
  Edit,
  FileText,
  Archive,
  Trash2,
  AlertTriangle,
  Radio,
  Signal,
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

// Mock data for sites
const mockSites = [
  {
    id: "TUN-GSM-042",
    name: "Tunis Centre",
    address: "Avenue Habib Bourguiba, Tunis",
    coordinates: "36.8065, 10.1815",
    category: "macro",
    type: "outdoor",
    status: "active",
    technologies: ["2G", "3G", "4G"],
    lastMaintenance: "15/04/2023",
    equipmentCount: 8,
  },
  {
    id: "SFX-GSM-118",
    name: "Sfax Nord",
    address: "Route de Tunis, Sfax",
    coordinates: "34.7478, 10.7661",
    category: "micro",
    type: "outdoor",
    status: "active",
    technologies: ["2G", "3G", "4G", "5G"],
    lastMaintenance: "03/03/2023",
    equipmentCount: 12,
  },
  {
    id: "NBL-GSM-073",
    name: "Nabeul Est",
    address: "Avenue Habib Bourguiba, Nabeul",
    coordinates: "36.4513, 10.7381",
    category: "macro",
    type: "outdoor",
    status: "maintenance",
    technologies: ["2G", "3G", "4G"],
    lastMaintenance: "22/02/2023",
    equipmentCount: 9,
  },
  {
    id: "BZT-GSM-091",
    name: "Bizerte Port",
    address: "Port de Bizerte, Bizerte",
    coordinates: "37.2744, 9.8739",
    category: "micro",
    type: "outdoor",
    status: "active",
    technologies: ["2G", "3G", "4G"],
    lastMaintenance: "10/01/2023",
    equipmentCount: 7,
  },
  {
    id: "SUS-GSM-054",
    name: "Sousse Plage",
    address: "Boulevard du 14 Janvier, Sousse",
    coordinates: "35.8245, 10.6346",
    category: "macro",
    type: "outdoor",
    status: "inactive",
    technologies: ["2G", "3G"],
    lastMaintenance: "05/12/2022",
    equipmentCount: 5,
  },
  {
    id: "KRN-GSM-032",
    name: "Kairouan Centre",
    address: "Avenue de la République, Kairouan",
    coordinates: "35.6784, 10.0963",
    category: "macro",
    type: "indoor",
    status: "archived",
    technologies: ["2G", "3G", "4G"],
    lastMaintenance: "18/11/2022",
    equipmentCount: 6,
  },
]

export default function SitesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [technologyFilter, setTechnologyFilter] = useState<string>("all")
  const [sites, setSites] = useState(mockSites)

  // Archive dialog
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false)
  const [siteToArchive, setSiteToArchive] = useState<any>(null)

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
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-amber-100 text-amber-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "maintenance":
        return "En maintenance"
      case "inactive":
        return "Inactif"
      case "archived":
        return "Archivé"
      default:
        return status
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "macro":
        return "Macro"
      case "micro":
        return "Micro"
      default:
        return category
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "outdoor":
        return "Outdoor"
      case "indoor":
        return "Indoor"
      default:
        return type
    }
  }

  // Filter sites based on search query and filters
  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || site.status === statusFilter
    const matchesCategory = categoryFilter === "all" || site.category === categoryFilter
    const matchesTechnology = technologyFilter === "all" || site.technologies.includes(technologyFilter)

    return matchesSearch && matchesStatus && matchesCategory && matchesTechnology
  })

  // Handle archive site
  const openArchiveDialog = (site: any) => {
    setSiteToArchive(site)
    setIsArchiveDialogOpen(true)
  }

  const handleArchiveSite = () => {
    if (!siteToArchive) return

    // Update site status to archived
    const updatedSites = sites.map((site) => (site.id === siteToArchive.id ? { ...site, status: "archived" } : site))

    setSites(updatedSites)
    setIsArchiveDialogOpen(false)

    toast({
      title: "Site archivé",
      description: `Le site ${siteToArchive.name} (${siteToArchive.id}) a été archivé avec succès.`,
    })
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
            <h1 className="text-2xl font-bold text-gray-800">Sites GSM</h1>
            <p className="text-gray-600">Gérez les sites GSM et leurs équipements</p>
          </div>
          <Link href="/manager/sites/add">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un site
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Input
                  placeholder="Rechercher par ID, nom ou adresse..."
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
                <option value="active">Actif</option>
                <option value="maintenance">En maintenance</option>
                <option value="inactive">Inactif</option>
                <option value="archived">Archivé</option>
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Toutes les catégories</option>
                <option value="macro">Macro</option>
                <option value="micro">Micro</option>
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={technologyFilter}
                onChange={(e) => setTechnologyFilter(e.target.value)}
              >
                <option value="all">Toutes les technologies</option>
                <option value="2G">2G</option>
                <option value="3G">3G</option>
                <option value="4G">4G</option>
                <option value="5G">5G</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Équipements</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSites.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                        Aucun site trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSites.map((site) => (
                      <TableRow key={site.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{site.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{site.name}</span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {site.address}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryLabel(site.category)}</TableCell>
                        <TableCell>{getTypeLabel(site.type)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {site.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(site.status)}>{getStatusLabel(site.status)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Signal className="h-4 w-4 text-orange-500 mr-1" />
                            <span>{site.equipmentCount}</span>
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
                              <DropdownMenuItem onClick={() => router.push(`/manager/sites/edit/${site.id}`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Voir détails
                              </DropdownMenuItem>
                              {site.status !== "archived" && (
                                <DropdownMenuItem onClick={() => openArchiveDialog(site)}>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archiver
                                </DropdownMenuItem>
                              )}
                              {site.status === "archived" && (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer définitivement
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Radio className="h-4 w-4 mr-2" />
                                Équipements
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
            <DialogTitle>Archiver le site</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir archiver ce site ? Cette action ne supprimera pas le site, mais le marquera comme
              archivé.
            </DialogDescription>
          </DialogHeader>

          {siteToArchive && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <p className="font-medium">Informations du site</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p>
                  <span className="font-medium">ID:</span> {siteToArchive.id}
                </p>
                <p>
                  <span className="font-medium">Nom:</span> {siteToArchive.name}
                </p>
                <p>
                  <span className="font-medium">Adresse:</span> {siteToArchive.address}
                </p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Un site archivé n'apparaîtra plus dans les listes principales mais restera accessible dans les archives.
                Les équipements associés seront également marqués comme archivés.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArchiveDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleArchiveSite}>
              <Archive className="h-4 w-4 mr-2" />
              Archiver le site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ManagerLayout>
  )
}
