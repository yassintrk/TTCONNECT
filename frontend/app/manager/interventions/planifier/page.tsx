"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ManagerLayout } from "@/components/manager/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Save, ArrowLeft } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"

export default function PlanifierInterventionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState<Date>()
  const [type, setType] = useState<string>("Préventive")
  const [site, setSite] = useState<string>("")
  const [technicien, setTechnicien] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [taches, setTaches] = useState<string>("")

  // Mock data
  const sites = [
    { id: "TUN-GSM-042", name: "Tunis Centre" },
    { id: "SFX-GSM-118", name: "Sfax Nord" },
    { id: "NBL-GSM-073", name: "Nabeul Est" },
    { id: "BZT-GSM-091", name: "Bizerte Port" },
    { id: "SUS-GSM-054", name: "Sousse Plage" },
  ]

  const techniciens = [
    { id: "TECH-001", name: "Ahmed Benali" },
    { id: "TECH-002", name: "Mohamed Trabelsi" },
    { id: "TECH-003", name: "Sami Bouazizi" },
    { id: "TECH-004", name: "Karim Mejri" },
  ]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!date || !site || !technicien || !description || !taches) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Simuler l'enregistrement
    toast({
      title: "Intervention planifiée",
      description: "L'intervention a été planifiée avec succès.",
    })

    // Redirection vers la liste des interventions
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
            <h2 className="text-2xl font-bold tracking-tight">Planifier une intervention</h2>
            <p className="text-muted-foreground">Créez une nouvelle intervention pour un site GSM</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/manager/interventions")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Détails de l'intervention</CardTitle>
            <CardDescription>Renseignez les informations nécessaires pour planifier l'intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    Date de l'intervention <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">
                    Type d'intervention <span className="text-red-500">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Préventive">Préventive</SelectItem>
                      <SelectItem value="Corrective">Corrective</SelectItem>
                      <SelectItem value="Mise à jour">Mise à jour</SelectItem>
                      <SelectItem value="Installation">Installation</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Urgence">Urgence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site">
                    Site <span className="text-red-500">*</span>
                  </Label>
                  <Select value={site} onValueChange={setSite}>
                    <SelectTrigger id="site">
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

                <div className="space-y-2">
                  <Label htmlFor="technicien">
                    Technicien assigné <span className="text-red-500">*</span>
                  </Label>
                  <Select value={technicien} onValueChange={setTechnicien}>
                    <SelectTrigger id="technicien">
                      <SelectValue placeholder="Sélectionner un technicien" />
                    </SelectTrigger>
                    <SelectContent>
                      {techniciens.map((tech) => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Description détaillée de l'intervention..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taches">
                  Tâches à effectuer <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="taches"
                  placeholder="Liste des tâches à effectuer (une par ligne)..."
                  value={taches}
                  onChange={(e) => setTaches(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">Entrez une tâche par ligne</p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => router.push("/manager/interventions")}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  <Save className="h-4 w-4 mr-2" />
                  Planifier l'intervention
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  )
}
