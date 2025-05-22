"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ManagerLayout } from "@/components/manager/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Calendar, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for an intervention
const mockIntervention = {
  id: "INT-2023-042",
  title: "Maintenance préventive - Site TUN-GSM-042",
  siteId: "TUN-GSM-042",
  siteName: "Tunis Centre",
  type: "maintenance",
  priority: "medium",
  status: "scheduled",
  description:
    "Maintenance préventive trimestrielle du site incluant vérification des antennes, des équipements radio et de transmission.",
  scheduledDate: "2023-05-20",
  scheduledTime: "09:00",
  estimatedDuration: "4",
  assignedTechnicians: ["TECH-001", "TECH-003"],
  requiredEquipment: [
    { id: "eq1", name: "Kit d'outils standard", quantity: 1 },
    { id: "eq2", name: "Multimètre", quantity: 2 },
    { id: "eq3", name: "Analyseur de spectre", quantity: 1 },
  ],
  tasks: [
    { id: "task1", description: "Vérification des connexions d'antennes", completed: false },
    { id: "task2", description: "Test des équipements radio", completed: false },
    { id: "task3", description: "Vérification de l'alimentation électrique", completed: false },
    { id: "task4", description: "Nettoyage des équipements", completed: false },
  ],
  createdBy: "MANAGER-001",
  createdAt: "2023-05-10T14:30:00Z",
}

// Mock data for technicians
const mockTechnicians = [
  { id: "TECH-001", name: "Ahmed Benali", specialization: "Radio" },
  { id: "TECH-002", name: "Sami Trabelsi", specialization: "Transmission" },
  { id: "TECH-003", name: "Leila Mansour", specialization: "Énergie" },
  { id: "TECH-004", name: "Karim Mejri", specialization: "Antennes" },
  { id: "TECH-005", name: "Nadia Bouazizi", specialization: "Fibre optique" },
]

// Mock data for sites
const mockSites = [
  { id: "TUN-GSM-042", name: "Tunis Centre" },
  { id: "SFX-GSM-118", name: "Sfax Nord" },
  { id: "NBL-GSM-073", name: "Nabeul Est" },
  { id: "BZT-GSM-091", name: "Bizerte Port" },
  { id: "SUS-GSM-054", name: "Sousse Plage" },
]

export default function EditInterventionPage() {
  const router = useRouter()
  const params = useParams()
  const interventionId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [intervention, setIntervention] = useState<any>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [siteId, setSiteId] = useState("")
  const [type, setType] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [description, setDescription] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [estimatedDuration, setEstimatedDuration] = useState("")
  const [assignedTechnicians, setAssignedTechnicians] = useState<string[]>([])
  const [requiredEquipment, setRequiredEquipment] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])

  // New equipment and task fields
  const [newEquipmentName, setNewEquipmentName] = useState("")
  const [newEquipmentQuantity, setNewEquipmentQuantity] = useState("1")
  const [newTaskDescription, setNewTaskDescription] = useState("")

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

      // In a real application, you would fetch the intervention data from your API
      // For this example, we'll use mock data
      setIntervention(mockIntervention)

      // Initialize form with intervention data
      setTitle(mockIntervention.title)
      setSiteId(mockIntervention.siteId)
      setType(mockIntervention.type)
      setPriority(mockIntervention.priority)
      setStatus(mockIntervention.status)
      setDescription(mockIntervention.description)
      setScheduledDate(mockIntervention.scheduledDate)
      setScheduledTime(mockIntervention.scheduledTime)
      setEstimatedDuration(mockIntervention.estimatedDuration)
      setAssignedTechnicians(mockIntervention.assignedTechnicians)
      setRequiredEquipment(mockIntervention.requiredEquipment)
      setTasks(mockIntervention.tasks)

      setIsLoading(false)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router, interventionId])

  // Handle equipment
  const addEquipment = () => {
    if (!newEquipmentName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom d'équipement",
        variant: "destructive",
      })
      return
    }

    const newEquipment = {
      id: `eq-${Date.now()}`,
      name: newEquipmentName,
      quantity: Number.parseInt(newEquipmentQuantity) || 1,
    }

    setRequiredEquipment([...requiredEquipment, newEquipment])
    setNewEquipmentName("")
    setNewEquipmentQuantity("1")
  }

  const removeEquipment = (id: string) => {
    setRequiredEquipment(requiredEquipment.filter((eq) => eq.id !== id))
  }

  // Handle tasks
  const addTask = () => {
    if (!newTaskDescription.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une description de tâche",
        variant: "destructive",
      })
      return
    }

    const newTask = {
      id: `task-${Date.now()}`,
      description: newTaskDescription,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setNewTaskDescription("")
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Handle technician selection
  const toggleTechnician = (techId: string) => {
    if (assignedTechnicians.includes(techId)) {
      setAssignedTechnicians(assignedTechnicians.filter((id) => id !== techId))
    } else {
      setAssignedTechnicians([...assignedTechnicians, techId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title || !siteId || !type || !priority || !status || !scheduledDate || !scheduledTime) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    if (assignedTechnicians.length === 0) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez assigner au moins un technicien.",
        variant: "destructive",
      })
      return
    }

    // Create updated intervention object
    const updatedIntervention = {
      id: interventionId,
      title,
      siteId,
      siteName: mockSites.find((site) => site.id === siteId)?.name || "",
      type,
      priority,
      status,
      description,
      scheduledDate,
      scheduledTime,
      estimatedDuration,
      assignedTechnicians,
      requiredEquipment,
      tasks,
      updatedAt: new Date().toISOString(),
    }

    // In a real application, you would send this data to your backend
    console.log("Updated intervention data:", updatedIntervention)

    // Show success message
    toast({
      title: "Intervention mise à jour avec succès",
      description: `L'intervention ${title} a été mise à jour.`,
    })

    // Redirect to interventions list
    setTimeout(() => {
      router.push("/manager/interventions")
    }, 1500)
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
            <h2 className="text-2xl font-bold tracking-tight">Modifier l'intervention {interventionId}</h2>
            <p className="text-muted-foreground">Modifiez les détails de l'intervention</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/manager/interventions")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Informations générales</TabsTrigger>
              <TabsTrigger value="schedule">Planification</TabsTrigger>
              <TabsTrigger value="resources">Ressources</TabsTrigger>
              <TabsTrigger value="tasks">Tâches</TabsTrigger>
            </TabsList>

            {/* Informations générales */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>Modifiez les informations de base de l'intervention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interventionId">ID de l'intervention</Label>
                      <Input id="interventionId" value={interventionId} disabled className="bg-gray-100" />
                      <p className="text-xs text-muted-foreground">L'ID de l'intervention ne peut pas être modifié</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Titre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Titre de l'intervention"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site">
                        Site <span className="text-red-500">*</span>
                      </Label>
                      <Select value={siteId} onValueChange={setSiteId} required>
                        <SelectTrigger id="site">
                          <SelectValue placeholder="Sélectionner un site" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSites.map((site) => (
                            <SelectItem key={site.id} value={site.id}>
                              {site.id} - {site.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">
                        Type d'intervention <span className="text-red-500">*</span>
                      </Label>
                      <Select value={type} onValueChange={setType} required>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="installation">Installation</SelectItem>
                          <SelectItem value="maintenance">Maintenance préventive</SelectItem>
                          <SelectItem value="repair">Réparation</SelectItem>
                          <SelectItem value="upgrade">Mise à niveau</SelectItem>
                          <SelectItem value="inspection">Inspection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">
                        Priorité <span className="text-red-500">*</span>
                      </Label>
                      <Select value={priority} onValueChange={setPriority} required>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Sélectionner une priorité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Basse</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Haute</SelectItem>
                          <SelectItem value="critical">Critique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">
                        Statut <span className="text-red-500">*</span>
                      </Label>
                      <Select value={status} onValueChange={setStatus} required>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="scheduled">Planifiée</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminée</SelectItem>
                          <SelectItem value="cancelled">Annulée</SelectItem>
                          <SelectItem value="archived">Archivée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Description détaillée de l'intervention..."
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Planification */}
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Planification</CardTitle>
                  <CardDescription>Modifiez la date et l'heure de l'intervention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">
                        Date prévue <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime">
                        Heure prévue <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="scheduledTime"
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedDuration">Durée estimée (heures)</Label>
                      <Input
                        id="estimatedDuration"
                        type="number"
                        min="0.5"
                        step="0.5"
                        placeholder="Ex: 2.5"
                        value={estimatedDuration}
                        onChange={(e) => setEstimatedDuration(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ressources */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources</CardTitle>
                  <CardDescription>Modifiez les techniciens et équipements nécessaires</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Techniciens assignés</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockTechnicians.map((tech) => (
                        <div key={tech.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tech-${tech.id}`}
                            checked={assignedTechnicians.includes(tech.id)}
                            onCheckedChange={() => toggleTechnician(tech.id)}
                          />
                          <Label htmlFor={`tech-${tech.id}`} className="cursor-pointer">
                            <div className="flex flex-col">
                              <span>{tech.name}</span>
                              <span className="text-xs text-muted-foreground">Spécialité: {tech.specialization}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                    {assignedTechnicians.length === 0 && (
                      <p className="text-sm text-red-500 mt-2">Veuillez assigner au moins un technicien</p>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Équipements requis</h3>
                    <div className="space-y-4">
                      {requiredEquipment.map((eq, index) => (
                        <div key={eq.id} className="flex items-center space-x-2">
                          <div className="flex-1 flex items-center space-x-2">
                            <span className="font-medium">{index + 1}.</span>
                            <span>{eq.name}</span>
                            <span className="text-sm text-muted-foreground">Quantité: {eq.quantity}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEquipment(eq.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="md:col-span-2">
                          <Input
                            placeholder="Nom de l'équipement"
                            value={newEquipmentName}
                            onChange={(e) => setNewEquipmentName(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            min="1"
                            placeholder="Qté"
                            value={newEquipmentQuantity}
                            onChange={(e) => setNewEquipmentQuantity(e.target.value)}
                            className="w-20"
                          />
                          <Button type="button" onClick={addEquipment}>
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tâches */}
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tâches</CardTitle>
                  <CardDescription>Modifiez les tâches à effectuer lors de l'intervention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <div className="flex-1 flex items-center space-x-2">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                          />
                          <Label
                            htmlFor={`task-${task.id}`}
                            className={`cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            <span className="font-medium mr-2">{index + 1}.</span>
                            {task.description}
                          </Label>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="md:col-span-3">
                        <Input
                          placeholder="Description de la tâche"
                          value={newTaskDescription}
                          onChange={(e) => setNewTaskDescription(e.target.value)}
                        />
                      </div>
                      <Button type="button" onClick={addTask}>
                        Ajouter une tâche
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" type="button" onClick={() => router.push("/manager/interventions")}>
              Annuler
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </ManagerLayout>
  )
}
