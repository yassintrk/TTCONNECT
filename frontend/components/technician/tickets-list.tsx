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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Calendar, Clock, FileText, MapPin, Plus } from "lucide-react"

// Mock data for tickets
const initialTickets = [
  {
    id: "TKT-1023",
    site: "TUN-GSM-042",
    siteName: "Tunis Centre",
    urgency: "high",
    title: "Panne d'alimentation",
    description: "Perte totale d'alimentation électrique. Générateur de secours activé.",
    status: "open",
    createdAt: "25/05/2023 14:30",
    updates: [],
    location: "Tunis, Avenue Habib Bourguiba",
  },
  {
    id: "TKT-1022",
    site: "SFX-GSM-118",
    siteName: "Sfax Nord",
    urgency: "medium",
    title: "Dégradation du signal",
    description: "Baisse de performance sur les secteurs Nord et Est. Interférence détectée.",
    status: "in_progress",
    createdAt: "23/05/2023 09:15",
    updates: [{ date: "23/05/2023 11:30", text: "Analyse en cours pour identifier la source d'interférence" }],
    location: "Route de Tunis, Sfax",
  },
  {
    id: "TKT-1021",
    site: "NBL-GSM-073",
    siteName: "Nabeul Est",
    urgency: "low",
    title: "Température élevée",
    description: "Température du shelter au-dessus de 35°C. Système de refroidissement à vérifier.",
    status: "resolved",
    createdAt: "21/05/2023 16:45",
    updates: [
      { date: "21/05/2023 17:30", text: "Vérification du système de climatisation" },
      { date: "22/05/2023 09:15", text: "Remplacement du filtre et nettoyage du système" },
      { date: "22/05/2023 14:00", text: "Température revenue à la normale" },
    ],
    location: "Avenue Habib Bourguiba, Nabeul",
  },
]

export function TicketsList() {
  const [tickets, setTickets] = useState(initialTickets)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [newTicket, setNewTicket] = useState({
    site: "",
    urgency: "medium",
    title: "",
    description: "",
  })
  const [newUpdate, setNewUpdate] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock sites data
  const sites = [
    { id: "TUN-GSM-042", name: "Tunis Centre" },
    { id: "SFX-GSM-118", name: "Sfax Nord" },
    { id: "NBL-GSM-073", name: "Nabeul Est" },
    { id: "BZT-GSM-091", name: "Bizerte Port" },
    { id: "SUS-GSM-054", name: "Sousse Plage" },
  ]

  const handleCreateTicket = () => {
    // Validate form
    if (!newTicket.site || !newTicket.title || !newTicket.description) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Get site name
    const site = sites.find((s) => s.id === newTicket.site)
    const siteName = site ? site.name : ""
    const location = site ? "Location for " + site.name : ""

    // Create new ticket
    const ticketId = `TKT-${1023 + tickets.length}`
    const now = new Date().toLocaleString()

    const ticket = {
      id: ticketId,
      site: newTicket.site,
      siteName,
      urgency: newTicket.urgency,
      title: newTicket.title,
      description: newTicket.description,
      status: "open",
      createdAt: now,
      updates: [],
      location,
    }

    setTickets([ticket, ...tickets])
    setIsCreateDialogOpen(false)

    // Reset form
    setNewTicket({
      site: "",
      urgency: "medium",
      title: "",
      description: "",
    })

    // Simulate sending notification to manager
    toast({
      title: "Ticket créé",
      description: `Le ticket ${ticketId} a été créé. Notification envoyée au manager.`,
    })
  }

  const handleUpdateTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setNewStatus(ticket.status)
    setNewUpdate("")
    setIsUpdateDialogOpen(true)
  }

  const handleViewDetails = (ticket: any) => {
    setSelectedTicket(ticket)
    setIsDetailsDialogOpen(true)
  }

  const handleSaveUpdate = () => {
    if (!selectedTicket) return

    // Validate update
    if (!newUpdate.trim() && newStatus === selectedTicket.status) {
      toast({
        title: "Aucune modification",
        description: "Veuillez ajouter une mise à jour ou changer le statut.",
        variant: "destructive",
      })
      return
    }

    // Update ticket
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        const updates = newUpdate.trim()
          ? [...ticket.updates, { date: new Date().toLocaleString(), text: newUpdate }]
          : ticket.updates

        return {
          ...ticket,
          status: newStatus,
          updates,
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setIsUpdateDialogOpen(false)

    // Simulate sending notification to manager
    toast({
      title: "Ticket mis à jour",
      description: `Le ticket ${selectedTicket.id} a été mis à jour. Notification envoyée au manager.`,
    })
  }

  const getUrgencyBadgeClass = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "Élevée"
      case "medium":
        return "Moyenne"
      case "low":
        return "Faible"
      default:
        return urgency
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Ouvert"
      case "in_progress":
        return "En cours"
      case "resolved":
        return "Résolu"
      default:
        return status
    }
  }

  const filteredTickets = statusFilter === "all" ? tickets : tickets.filter((ticket) => ticket.status === statusFilter)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tickets d'Incidents</CardTitle>
              <CardDescription>Gérez les incidents sur les sites</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="resolved">Résolu</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau ticket
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Aucun ticket ne correspond à votre filtre</div>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{ticket.title}</h3>
                        <Badge className={getUrgencyBadgeClass(ticket.urgency)}>
                          {getUrgencyLabel(ticket.urgency)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {ticket.siteName} ({ticket.site})
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusBadgeClass(ticket.status)}>{getStatusLabel(ticket.status)}</Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Créé le: {ticket.createdAt}</span>
                  </div>

                  {ticket.updates.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Dernière mise à jour:</h4>
                      <div className="text-sm text-muted-foreground">{ticket.updates.slice(-1)[0].text}</div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(ticket)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleUpdateTicket(ticket)}
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

      {/* Create Ticket Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau ticket d'incident</DialogTitle>
            <DialogDescription>Signalez un incident sur un site GSM</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="site">
                Site concerné <span className="text-red-500">*</span>
              </label>
              <Select value={newTicket.site} onValueChange={(value) => setNewTicket({ ...newTicket, site: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name} ({site.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="urgency">Niveau d'urgence</label>
              <Select
                value={newTicket.urgency}
                onValueChange={(value) => setNewTicket({ ...newTicket, urgency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau d'urgence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="title">
                Titre <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                placeholder="Titre court décrivant l'incident"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                placeholder="Description détaillée de l'incident..."
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateTicket} className="bg-orange-500 hover:bg-orange-600">
              Créer le ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Ticket Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mettre à jour le ticket</DialogTitle>
            <DialogDescription>
              Ticket {selectedTicket?.id} - {selectedTicket?.title}
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
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="resolved">Résolu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="update">Mise à jour</label>
              <Textarea
                id="update"
                placeholder="Ajoutez des informations sur l'évolution de l'incident..."
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
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
            <DialogTitle>Détails du ticket</DialogTitle>
            <DialogDescription>
              {selectedTicket?.id} - {selectedTicket?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Informations générales</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Site:</span>
                      <span className="text-sm font-medium">
                        {selectedTicket.siteName} ({selectedTicket.site})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Emplacement:</span>
                      <span className="text-sm font-medium">{selectedTicket.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Créé le:</span>
                      <span className="text-sm font-medium">{selectedTicket.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Urgence:</span>
                      <Badge className={getUrgencyBadgeClass(selectedTicket.urgency)}>
                        {getUrgencyLabel(selectedTicket.urgency)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Statut:</span>
                      <Badge className={getStatusBadgeClass(selectedTicket.status)}>
                        {getStatusLabel(selectedTicket.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <div className="mt-2 rounded-lg border p-3">
                    <p className="text-sm">{selectedTicket.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Historique des mises à jour</h3>
                {selectedTicket.updates.length === 0 ? (
                  <div className="mt-2 text-sm text-muted-foreground">Aucune mise à jour enregistrée</div>
                ) : (
                  <div className="mt-2 space-y-3">
                    {selectedTicket.updates.map((update: any, index: number) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground mb-1">{update.date}</div>
                        <div className="text-sm">{update.text}</div>
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
                handleUpdateTicket(selectedTicket)
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
