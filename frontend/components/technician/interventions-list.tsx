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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Calendar, MapPin, User, PenToolIcon as Tool, Clock, FileText } from "lucide-react"

// Mock data for interventions
const initialInterventions = [
  {
    id: "INT-2023",
    site: "TUN-GSM-042",
    siteName: "Tunis Centre",
    type: "Préventive",
    status: "Planifiée",
    date: "28/05/2023",
    tech: "Ahmed B.",
    description: "Maintenance préventive trimestrielle",
    tasks: [
      "Vérification des connexions",
      "Nettoyage des équipements",
      "Mise à jour des firmwares",
      "Test de performance",
    ],
    observations: [],
    location: "Tunis, Avenue Habib Bourguiba",
  },
  {
    id: "INT-2022",
    site: "SFX-GSM-118",
    siteName: "Sfax Nord",
    type: "Mise à jour",
    status: "En cours",
    date: "25/05/2023",
    tech: "Ahmed B.",
    description: "Mise à jour des équipements pour support 5G",
    tasks: ["Installation nouveaux modules", "Configuration réseau", "Tests de couverture"],
    observations: [
      { date: "25/05/2023 09:30", text: "Début de l'installation des modules" },
      { date: "25/05/2023 11:45", text: "Problème de compatibilité avec l'ancien système" },
    ],
    location: "Route de Tunis, Sfax",
  },
  {
    id: "INT-2021",
    site: "NBL-GSM-073",
    siteName: "Nabeul Est",
    type: "Corrective",
    status: "Terminée",
    date: "22/05/2023",
    tech: "Ahmed B.",
    description: "Remplacement RRU défectueux",
    tasks: ["Démontage ancien RRU", "Installation nouveau RRU", "Configuration", "Tests"],
    observations: [
      { date: "22/05/2023 08:15", text: "Démontage effectué" },
      { date: "22/05/2023 10:30", text: "Installation du nouveau RRU terminée" },
      { date: "22/05/2023 13:45", text: "Tests effectués avec succès" },
    ],
    location: "Avenue Habib Bourguiba, Nabeul",
  },
  {
    id: "INT-2020",
    site: "BZT-GSM-091",
    siteName: "Bizerte Port",
    type: "Inspection",
    status: "Planifiée",
    date: "30/05/2023",
    tech: "Ahmed B.",
    description: "Inspection suite à alerte de sécurité",
    tasks: ["Vérification accès site", "Contrôle équipements", "Rapport d'inspection"],
    observations: [],
    location: "Port de Bizerte, Bizerte",
  },
  {
    id: "INT-2019",
    site: "SUS-GSM-054",
    siteName: "Sousse Plage",
    type: "Urgence",
    status: "Planifiée",
    date: "29/05/2023",
    tech: "Ahmed B.",
    description: "Intervention d'urgence suite à panne totale",
    tasks: ["Diagnostic", "Remplacement alimentation", "Redémarrage système", "Tests"],
    observations: [],
    location: "Boulevard du 14 Janvier, Sousse",
  },
]

export function InterventionsList() {
  const [interventions, setInterventions] = useState(initialInterventions)
  const [selectedIntervention, setSelectedIntervention] = useState<any>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [newObservation, setNewObservation] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleUpdateStatus = (intervention: any) => {
    setSelectedIntervention(intervention)
    setNewStatus(intervention.status)
    setIsUpdateDialogOpen(true)
  }

  const handleViewDetails = (intervention: any) => {
    setSelectedIntervention(intervention)
    setIsDetailsDialogOpen(true)
  }

  const handleSaveUpdate = () => {
    if (!selectedIntervention) return

    // Update intervention status
    const updatedInterventions = interventions.map((intervention) => {
      if (intervention.id === selectedIntervention.id) {
        // Add observation if provided
        const updatedObservations = newObservation.trim()
          ? [
              ...intervention.observations,
              {
                date: new Date().toLocaleString(),
                text: newObservation,
              },
            ]
          : intervention.observations

        return {
          ...intervention,
          status: newStatus,
          observations: updatedObservations,
        }
      }
      return intervention
    })

    setInterventions(updatedInterventions)
    setIsUpdateDialogOpen(false)
    setNewObservation("")

    // Simulate sending notification to manager
    toast({
      title: "Intervention mise à jour",
      description: `L'intervention ${selectedIntervention.id} a été mise à jour. Notification envoyée au manager.`,
    })
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Planifiée":
        return "bg-yellow-100 text-yellow-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Terminée":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInterventions =
    statusFilter === "all"
      ? interventions
      : interventions.filter((intervention) => intervention.status === statusFilter)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Interventions Assignées</CardTitle>
              <CardDescription>Gérez vos interventions de maintenance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Planifiée">Planifiée</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminée">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInterventions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucune intervention ne correspond à votre filtre
              </div>
            ) : (
              filteredInterventions.map((intervention) => (
                <div key={intervention.id} className="rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{intervention.description}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {intervention.siteName} ({intervention.site})
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusBadgeClass(intervention.status)}>{intervention.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Date: {intervention.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Technicien: {intervention.tech}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tool className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Type: {intervention.type}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Tâches à effectuer:</h4>
                    <ul className="space-y-1">
                      {intervention.tasks.map((task, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {intervention.observations.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Dernières observations:</h4>
                      <div className="text-sm text-muted-foreground">{intervention.observations.slice(-1)[0].text}</div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(intervention)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleUpdateStatus(intervention)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Mettre à jour
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mettre à jour l'intervention</DialogTitle>
            <DialogDescription>
              Intervention {selectedIntervention?.id} - {selectedIntervention?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="status">Statut</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planifiée">Planifiée</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminée">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="observation">Observation</label>
              <Textarea
                id="observation"
                placeholder="Ajoutez vos observations sur cette intervention..."
                value={newObservation}
                onChange={(e) => setNewObservation(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveUpdate} className="bg-orange-500 hover:bg-orange-600">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de l'intervention</DialogTitle>
            <DialogDescription>
              {selectedIntervention?.id} - {selectedIntervention?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedIntervention && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Informations générales</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Site:</span>
                      <span className="text-sm font-medium">
                        {selectedIntervention.siteName} ({selectedIntervention.site})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Emplacement:</span>
                      <span className="text-sm font-medium">{selectedIntervention.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">{selectedIntervention.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium">{selectedIntervention.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Statut:</span>
                      <Badge className={getStatusBadgeClass(selectedIntervention.status)}>
                        {selectedIntervention.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Tâches à effectuer</h3>
                  <ul className="mt-2 space-y-2">
                    {selectedIntervention.tasks.map((task: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Historique des observations</h3>
                {selectedIntervention.observations.length === 0 ? (
                  <div className="mt-2 text-sm text-muted-foreground">Aucune observation enregistrée</div>
                ) : (
                  <div className="mt-2 space-y-3">
                    {selectedIntervention.observations.map((obs: any, index: number) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground mb-1">{obs.date}</div>
                        <div className="text-sm">{obs.text}</div>
                      </div>
                    ))}
                  </div>
                )}
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
                handleUpdateStatus(selectedIntervention)
              }}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
