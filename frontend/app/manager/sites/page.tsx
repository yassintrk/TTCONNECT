"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreVertical, MapPin, Edit, Trash } from "lucide-react"
import Link from "next/link"

interface Site {
  id: string
  name: string
  location: string
  type: string
  status: "active" | "maintenance" | "offline"
  lastMaintenance: string
}

export default function SitesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Mock data - replace with actual data fetching
  const [sites, setSites] = useState<Site[]>([
    {
      id: "1",
      name: "Site Tunis Centre",
      location: "Tunis, Avenue Habib Bourguiba",
      type: "Urbain",
      status: "active",
      lastMaintenance: "Il y a 2 semaines",
    },
    {
      id: "2",
      name: "Site Sousse Plage",
      location: "Sousse, Zone touristique",
      type: "Côtier",
      status: "maintenance",
      lastMaintenance: "En cours",
    },
    {
      id: "3",
      name: "Site Sfax Industriel",
      location: "Sfax, Zone industrielle",
      type: "Industriel",
      status: "active",
      lastMaintenance: "Il y a 1 mois",
    },
    {
      id: "4",
      name: "Site Bizerte Port",
      location: "Bizerte, Zone portuaire",
      type: "Côtier",
      status: "offline",
      lastMaintenance: "Il y a 3 mois",
    },
    {
      id: "5",
      name: "Site Kairouan",
      location: "Kairouan, Centre-ville",
      type: "Urbain",
      status: "active",
      lastMaintenance: "Il y a 2 mois",
    },
  ])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
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
      case "offline":
        return "Hors ligne"
      default:
        return status
    }
  }

  // Filter sites based on search query and filters
  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || site.status === statusFilter
    const matchesType = typeFilter === "all" || site.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sites GSM</h1>
          <p className="text-gray-600">Gérez vos sites et antennes</p>
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
                placeholder="Rechercher par nom ou emplacement..."
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
              <option value="offline">Hors ligne</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="Urbain">Urbain</option>
              <option value="Côtier">Côtier</option>
              <option value="Industriel">Industriel</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du site</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSites.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      Aucun site trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSites.map((site) => (
                    <TableRow key={site.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{site.name}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {site.location}
                      </TableCell>
                      <TableCell>{site.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(site.status)}>{getStatusLabel(site.status)}</Badge>
                      </TableCell>
                      <TableCell>{site.lastMaintenance}</TableCell>
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
                              <Trash className="h-4 w-4 mr-2" />
                              Supprimer
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
  )
}
