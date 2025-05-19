"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { AlertTriangle, Calendar, FileText, MapPin, Radio, PenToolIcon as Tool } from "lucide-react"

// Mock data for sites
const initialSites = [
  {
    id: "TUN-GSM-042",
    name: "Tunis Centre",
    type: "Macro",
    status: "Actif",
    address: "Avenue Habib Bourguiba, Tunis",
    coordinates: "36.8065, 10.1815",
    technology: ["2G", "3G", "4G"],
    capacity: 85,
    lastMaintenance: "15/04/2023",
    equipments: [
      { id: "ANT-001", type: "Antenne", model: "Huawei ATR4518R6", status: "Opérationnel" },
      { id: "BBU-002", type: "BBU", model: "Huawei BBU3900", status: "Opérationnel" },
      { id: "RRU-003", type: "RRU", model: "Huawei RRU3953", status: "Opérationnel" },
    ],
  },
  {
    id: "SFX-GSM-118",
    name: "Sfax Nord",
    type: "Micro",
    status: "Actif",
    address: "Route de Tunis, Sfax",
    coordinates: "34.7478, 10.7661",
    technology: ["2G", "3G", "4G", "5G"],
    capacity: 72,
    lastMaintenance: "03/03/2023",
    equipments: [
      { id: "ANT-004", type: "Antenne", model: "Nokia AAHF", status: "Opérationnel" },
      { id: "BBU-005", type: "BBU", model: "Nokia AirScale", status: "Opérationnel" },
      { id: "RRU-006", type: "RRU", model: "Nokia AirScale", status: "Maintenance requise" },
    ],
  },
  {
    id: "NBL-GSM-073",
    name: "Nabeul Est",
    type: "Macro",
    status: "Maintenance",
    address: "Avenue Habib Bourguiba, Nabeul",
    coordinates: "36.4513, 10.7381",
    technology: ["2G", "3G", "4G"],
    capacity: 65,
    lastMaintenance: "22/02/2023",
    equipments: [
      { id: "ANT-007", type: "Antenne", model: "Ericsson AIR 3246", status: "Maintenance requise" },
      { id: "BBU-008", type: "BBU", model: "Ericsson Baseband 6630", status: "Opérationnel" },
      { id: "RRU-009", type: "RRU", model: "Ericsson Radio 4443", status: "Défectueux" },
    ],
  },
  {
    id: "BZT-GSM-091",
    name: "Bizerte Port",
    type: "Micro",
    status: "Actif",
    address: "Port de Bizerte, Bizerte",
    coordinates: "37.2744, 9.8739",
    technology: ["2G", "3G", "4G"],
    capacity: 78,
    lastMaintenance: "10/01/2023",
    equipments: [
      { id: "ANT-010", type: "Antenne", model: "ZTE ZXSDR B8200", status: "Opérationnel" },
      { id: "BBU-011", type: "BBU", model: "ZTE ZXSDR B8300", status: "Opérationnel" },
      { id: "RRU-012", type: "RRU", model: "ZTE ZXSDR R8862", status: "Opérationnel" },
    ],
  },
  {
    id: "SUS-GSM-054",
    name: "Sousse Plage",
    type: "Macro",
    status: "Inactif",
    address: "Boulevard du 14 Janvier, Sousse",
    coordinates: "35.8245, 10.6346",
    technology: ["2G", "3G"],
    capacity: 45,
    lastMaintenance: "05/12/2022",
    equipments: [
      { id: "ANT-013", type: "Antenne", model: "Huawei ATR4518R6", status: "Défectueux" },
      { id: "BBU-014", type: "BBU", model: "Huawei BBU3900", status: "Défectueux" },
      { id: "RRU-015", type: "RRU", model: "Huawei RRU3953", status: "Défectueux" },
    ],
  },
]

export function SitesList() {
  const [sites, setSites] = useState(initialSites)
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const handleViewSiteDetails = (site: any) => {
    setSelectedSite(site)
    setIsDetailsDialogOpen(true)
  }

  const handleViewEquipment = (site: any) => {
    setSelectedSite(site)
    setIsEquipmentDialogOpen(true)
  }

  const handleCreateTicket = (site: any) => {
    // Store site info in localStorage to pre-fill the ticket form
    localStorage.setItem(
      "ticketSite",
      JSON.stringify({
        id: site.id,
        name: site.name,
      }),
    )

    // Navigate to tickets page
    window.location.href = "/technician/tickets"

    toast({
      title: "Création de ticket",
      description: `Redirection vers la page de création de ticket pour le site ${site.name}.`,
    })
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-amber-100 text-amber-800"
      case "Inactif":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredSites = sites.filter((site) => {
    const matchesStatus = statusFilter === "all" || site.status === statusFilter
    const matchesType = typeFilter === "all" || site.type === typeFilter
    return matchesStatus && matchesType
  })

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Sites Assignés</CardTitle>
              <CardDescription>Sites GSM sous votre responsabilité</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Macro">Macro</SelectItem>
                  <SelectItem value="Micro">Micro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Aucun site ne correspond à votre filtre</div>
            ) : (
              filteredSites.map((site) => (
                <div key={site.id} className="rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{site.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{site.address}</span>
                      </div>
                    </div>
                    <Badge className={getStatusBadgeClass(site.status)}>{site.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ID: {site.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tool className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Type: {site.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Dernière maintenance: {site.lastMaintenance}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Technologies:</span>
                      <div className="flex gap-1">
                        {site.technology.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Capacité:</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: `${site.capacity}%` }}></div>
                        </div>
                        <span className="text-xs">{site.capacity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewSiteDetails(site)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewEquipment(site)}>
                      <Tool className="h-4 w-4 mr-2" />
                      Équipements
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleCreateTicket(site)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Signaler incident
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Site Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails du site</DialogTitle>
            <DialogDescription>
              {selectedSite?.id} - {selectedSite?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedSite && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Informations générales</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium">{selectedSite.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Statut:</span>
                      <Badge className={getStatusBadgeClass(selectedSite.status)}>{selectedSite.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Adresse:</span>
                      <span className="text-sm font-medium">{selectedSite.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Coordonnées:</span>
                      <span className="text-sm font-medium">{selectedSite.coordinates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dernière maintenance:</span>
                      <span className="text-sm font-medium">{selectedSite.lastMaintenance}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Technologies et performance</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Technologies:</span>
                      <div className="flex gap-1">
                        {selectedSite.technology.map((tech: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Capacité:</span>
                      <span className="text-sm font-medium">{selectedSite.capacity}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: `${selectedSite.capacity}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Équipements (Aperçu)</h3>
                <div className="mt-2 space-y-2">
                  {selectedSite.equipments.slice(0, 3).map((equipment: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">
                          {equipment.type} - {equipment.model}
                        </span>
                        <p className="text-xs text-muted-foreground">{equipment.id}</p>
                      </div>
                      <Badge
                        variant={
                          equipment.status === "Opérationnel"
                            ? "default"
                            : equipment.status === "Maintenance requise"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {equipment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Fermer
            </Button>
            <Button
              onClick={() => {
                setIsDetailsDialogOpen(false)
                handleViewEquipment(selectedSite)
              }}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Voir équipements
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Equipment Dialog */}
      <Dialog open={isEquipmentDialogOpen} onOpenChange={setIsEquipmentDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Équipements du site</DialogTitle>
            <DialogDescription>
              {selectedSite?.id} - {selectedSite?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedSite && (
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>ID</div>
                  <div>Type</div>
                  <div>Modèle</div>
                  <div>Statut</div>
                </div>
                {selectedSite.equipments.map((equipment: any, index: number) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b items-center">
                    <div className="font-medium">{equipment.id}</div>
                    <div>{equipment.type}</div>
                    <div>{equipment.model}</div>
                    <div>
                      <Badge
                        variant={
                          equipment.status === "Opérationnel"
                            ? "default"
                            : equipment.status === "Maintenance requise"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {equipment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Statistiques des équipements</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Équipements opérationnels</span>
                      <span className="text-sm font-medium">
                        {selectedSite.equipments.filter((eq: any) => eq.status === "Opérationnel").length}/
                        {selectedSite.equipments.length}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${
                            (selectedSite.equipments.filter((eq: any) => eq.status === "Opérationnel").length /
                              selectedSite.equipments.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setIsEquipmentDialogOpen(false)
                        handleCreateTicket(selectedSite)
                      }}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Signaler un problème d'équipement
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEquipmentDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
