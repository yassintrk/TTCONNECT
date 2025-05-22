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
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Save, Trash } from "lucide-react"

// Mock data for a site
const mockSite = {
  id: "TUN-GSM-042",
  name: "Tunis Centre",
  address: "Avenue Habib Bourguiba, Tunis",
  coordinates: "36.8065, 10.1815",
  description: "Site principal couvrant le centre-ville de Tunis",
  category: "macro",
  type: "outdoor",
  status: "active",
  technologies: ["2G", "3G", "4G"],
  equipment: {
    antennas: [
      {
        id: "ant-1",
        model: "Huawei ATR4518R6",
        type: "sector",
        band: "900MHz",
        status: "operational",
      },
      {
        id: "ant-2",
        model: "Nokia AAHF",
        type: "panel",
        band: "1800MHz",
        status: "operational",
      },
    ],
    transmission: [
      {
        id: "trans-1",
        model: "Huawei OptiX RTN 950",
        type: "microwave",
        capacity: "1Gbps",
        status: "operational",
      },
    ],
    radio: [
      {
        id: "radio-1",
        model: "Huawei BBU3900",
        type: "bbu",
        technology: "multi",
        status: "operational",
      },
      {
        id: "radio-2",
        model: "Huawei RRU3953",
        type: "rru",
        technology: "4G",
        status: "operational",
      },
    ],
  },
}

export default function EditSitePage() {
  const router = useRouter()
  const params = useParams()
  const siteId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [site, setSite] = useState<any>(null)

  // Site basic information
  const [siteName, setSiteName] = useState("")
  const [siteAddress, setSiteAddress] = useState("")
  const [siteCoordinates, setSiteCoordinates] = useState("")
  const [siteDescription, setSiteDescription] = useState("")
  const [siteCategory, setSiteCategory] = useState("macro")
  const [siteType, setSiteType] = useState("outdoor")
  const [siteStatus, setSiteStatus] = useState("active")

  // Site technologies
  const [technologies, setTechnologies] = useState({
    "2G": false,
    "3G": false,
    "4G": false,
    "5G": false,
  })

  // Site equipment
  const [antennas, setAntennas] = useState<any[]>([])
  const [transmissionEquipment, setTransmissionEquipment] = useState<any[]>([])
  const [radioEquipment, setRadioEquipment] = useState<any[]>([])

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

      // In a real application, you would fetch the site data from your API
      // For this example, we'll use mock data
      setSite(mockSite)

      // Initialize form with site data
      setSiteName(mockSite.name)
      setSiteAddress(mockSite.address)
      setSiteCoordinates(mockSite.coordinates)
      setSiteDescription(mockSite.description || "")
      setSiteCategory(mockSite.category)
      setSiteType(mockSite.type)
      setSiteStatus(mockSite.status)

      // Initialize technologies
      const techObj = {
        "2G": mockSite.technologies.includes("2G"),
        "3G": mockSite.technologies.includes("3G"),
        "4G": mockSite.technologies.includes("4G"),
        "5G": mockSite.technologies.includes("5G"),
      }
      setTechnologies(techObj)

      // Initialize equipment
      setAntennas(mockSite.equipment.antennas)
      setTransmissionEquipment(mockSite.equipment.transmission)
      setRadioEquipment(mockSite.equipment.radio)

      setIsLoading(false)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router, siteId])

  // Handle antenna equipment
  const addAntenna = () => {
    setAntennas([
      ...antennas,
      {
        id: `antenna-${Date.now()}`,
        model: "",
        type: "",
        band: "",
        status: "operational",
      },
    ])
  }

  const removeAntenna = (id: string) => {
    if (antennas.length > 1) {
      setAntennas(antennas.filter((antenna) => antenna.id !== id))
    } else {
      toast({
        title: "Action impossible",
        description: "Vous devez avoir au moins une antenne.",
        variant: "destructive",
      })
    }
  }

  const updateAntenna = (id: string, field: string, value: string) => {
    setAntennas(antennas.map((antenna) => (antenna.id === id ? { ...antenna, [field]: value } : antenna)))
  }

  // Handle transmission equipment
  const addTransmissionEquipment = () => {
    setTransmissionEquipment([
      ...transmissionEquipment,
      {
        id: `transmission-${Date.now()}`,
        model: "",
        type: "",
        capacity: "",
        status: "operational",
      },
    ])
  }

  const removeTransmissionEquipment = (id: string) => {
    if (transmissionEquipment.length > 1) {
      setTransmissionEquipment(transmissionEquipment.filter((equipment) => equipment.id !== id))
    } else {
      toast({
        title: "Action impossible",
        description: "Vous devez avoir au moins un équipement de transmission.",
        variant: "destructive",
      })
    }
  }

  const updateTransmissionEquipment = (id: string, field: string, value: string) => {
    setTransmissionEquipment(
      transmissionEquipment.map((equipment) => (equipment.id === id ? { ...equipment, [field]: value } : equipment)),
    )
  }

  // Handle radio equipment
  const addRadioEquipment = () => {
    setRadioEquipment([
      ...radioEquipment,
      {
        id: `radio-${Date.now()}`,
        model: "",
        type: "",
        technology: "",
        status: "operational",
      },
    ])
  }

  const removeRadioEquipment = (id: string) => {
    if (radioEquipment.length > 1) {
      setRadioEquipment(radioEquipment.filter((equipment) => equipment.id !== id))
    } else {
      toast({
        title: "Action impossible",
        description: "Vous devez avoir au moins un équipement radio.",
        variant: "destructive",
      })
    }
  }

  const updateRadioEquipment = (id: string, field: string, value: string) => {
    setRadioEquipment(
      radioEquipment.map((equipment) => (equipment.id === id ? { ...equipment, [field]: value } : equipment)),
    )
  }

  // Handle technology toggles
  const toggleTechnology = (tech: string) => {
    setTechnologies({
      ...technologies,
      [tech]: !technologies[tech as keyof typeof technologies],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!siteName || !siteAddress || !siteCoordinates) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Check if at least one technology is selected
    const hasTechnology = Object.values(technologies).some((value) => value)
    if (!hasTechnology) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez sélectionner au moins une technologie.",
        variant: "destructive",
      })
      return
    }

    // Create updated site object
    const updatedSite = {
      id: siteId,
      name: siteName,
      address: siteAddress,
      coordinates: siteCoordinates,
      description: siteDescription,
      category: siteCategory,
      type: siteType,
      status: siteStatus,
      technologies: Object.entries(technologies)
        .filter(([_, value]) => value)
        .map(([key, _]) => key),
      equipment: {
        antennas,
        transmission: transmissionEquipment,
        radio: radioEquipment,
      },
      updatedAt: new Date().toISOString(),
    }

    // In a real application, you would send this data to your backend
    console.log("Updated site data:", updatedSite)

    // Show success message
    toast({
      title: "Site mis à jour avec succès",
      description: `Le site ${siteName} (${siteId}) a été mis à jour.`,
    })

    // Redirect to sites list
    setTimeout(() => {
      router.push("/manager/sites")
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
            <h2 className="text-2xl font-bold tracking-tight">Modifier le site {siteId}</h2>
            <p className="text-muted-foreground">Modifiez les informations et équipements du site</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/manager/sites")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Informations générales</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
              <TabsTrigger value="antennas">Antennes</TabsTrigger>
              <TabsTrigger value="transmission">Transmission</TabsTrigger>
              <TabsTrigger value="radio">Équipement Radio</TabsTrigger>
            </TabsList>

            {/* Informations générales */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales du site</CardTitle>
                  <CardDescription>Modifiez les informations de base du site GSM</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteId">ID du site</Label>
                      <Input id="siteId" value={siteId} disabled className="bg-gray-100" />
                      <p className="text-xs text-muted-foreground">L'ID du site ne peut pas être modifié</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteName">
                        Nom du site <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="siteName"
                        placeholder="Ex: Tunis Centre"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteAddress">
                        Adresse <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="siteAddress"
                        placeholder="Ex: Avenue Habib Bourguiba, Tunis"
                        value={siteAddress}
                        onChange={(e) => setSiteAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteCoordinates">
                        Coordonnées GPS <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="siteCoordinates"
                        placeholder="Ex: 36.8065, 10.1815"
                        value={siteCoordinates}
                        onChange={(e) => setSiteCoordinates(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="siteDescription">Description</Label>
                      <Textarea
                        id="siteDescription"
                        placeholder="Description du site..."
                        rows={3}
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteCategory">Catégorie du site</Label>
                      <Select value={siteCategory} onValueChange={setSiteCategory}>
                        <SelectTrigger id="siteCategory">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="macro">Macro</SelectItem>
                          <SelectItem value="micro">Micro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteType">Type du site</Label>
                      <Select value={siteType} onValueChange={setSiteType}>
                        <SelectTrigger id="siteType">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="outdoor">Outdoor</SelectItem>
                          <SelectItem value="indoor">Indoor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteStatus">Statut</Label>
                      <Select value={siteStatus} onValueChange={setSiteStatus}>
                        <SelectTrigger id="siteStatus">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="maintenance">En maintenance</SelectItem>
                          <SelectItem value="inactive">Inactif</SelectItem>
                          <SelectItem value="planned">Planifié</SelectItem>
                          <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technologies */}
            <TabsContent value="technologies">
              <Card>
                <CardHeader>
                  <CardTitle>Technologies du site</CardTitle>
                  <CardDescription>Modifiez les technologies disponibles sur ce site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="tech2g" className="flex items-center space-x-2 cursor-pointer">
                          <div className="space-y-1">
                            <p>Technologie 2G</p>
                            <p className="text-sm text-muted-foreground">GSM, GPRS, EDGE</p>
                          </div>
                        </Label>
                        <Switch
                          id="tech2g"
                          checked={technologies["2G"]}
                          onCheckedChange={() => toggleTechnology("2G")}
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="tech3g" className="flex items-center space-x-2 cursor-pointer">
                          <div className="space-y-1">
                            <p>Technologie 3G</p>
                            <p className="text-sm text-muted-foreground">UMTS, HSPA, HSPA+</p>
                          </div>
                        </Label>
                        <Switch
                          id="tech3g"
                          checked={technologies["3G"]}
                          onCheckedChange={() => toggleTechnology("3G")}
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="tech4g" className="flex items-center space-x-2 cursor-pointer">
                          <div className="space-y-1">
                            <p>Technologie 4G</p>
                            <p className="text-sm text-muted-foreground">LTE, LTE-Advanced</p>
                          </div>
                        </Label>
                        <Switch
                          id="tech4g"
                          checked={technologies["4G"]}
                          onCheckedChange={() => toggleTechnology("4G")}
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="tech5g" className="flex items-center space-x-2 cursor-pointer">
                          <div className="space-y-1">
                            <p>Technologie 5G</p>
                            <p className="text-sm text-muted-foreground">5G NR</p>
                          </div>
                        </Label>
                        <Switch
                          id="tech5g"
                          checked={technologies["5G"]}
                          onCheckedChange={() => toggleTechnology("5G")}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        Note: Veuillez sélectionner au moins une technologie disponible sur ce site.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Antennes */}
            <TabsContent value="antennas">
              <Card>
                <CardHeader>
                  <CardTitle>Antennes</CardTitle>
                  <CardDescription>Modifiez les antennes installées sur ce site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {antennas.map((antenna, index) => (
                      <div key={antenna.id} className="space-y-4 p-4 border rounded-md relative">
                        <div className="absolute top-2 right-2">
                          <Button variant="ghost" size="icon" onClick={() => removeAntenna(antenna.id)} type="button">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>

                        <h3 className="font-medium">Antenne {index + 1}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`antenna-model-${antenna.id}`}>
                              Modèle <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`antenna-model-${antenna.id}`}
                              placeholder="Ex: Huawei ATR4518R6"
                              value={antenna.model}
                              onChange={(e) => updateAntenna(antenna.id, "model", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`antenna-type-${antenna.id}`}>
                              Type <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={antenna.type}
                              onValueChange={(value) => updateAntenna(antenna.id, "type", value)}
                            >
                              <SelectTrigger id={`antenna-type-${antenna.id}`}>
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="directional">Directionnelle</SelectItem>
                                <SelectItem value="omnidirectional">Omnidirectionnelle</SelectItem>
                                <SelectItem value="panel">Panneau</SelectItem>
                                <SelectItem value="sector">Sectorielle</SelectItem>
                                <SelectItem value="mimo">MIMO</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`antenna-band-${antenna.id}`}>
                              Bande de fréquence <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`antenna-band-${antenna.id}`}
                              placeholder="Ex: 700MHz, 900MHz, 1800MHz"
                              value={antenna.band}
                              onChange={(e) => updateAntenna(antenna.id, "band", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`antenna-status-${antenna.id}`}>Statut</Label>
                            <Select
                              value={antenna.status}
                              onValueChange={(value) => updateAntenna(antenna.id, "status", value)}
                            >
                              <SelectTrigger id={`antenna-status-${antenna.id}`}>
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operational">Opérationnel</SelectItem>
                                <SelectItem value="maintenance">En maintenance</SelectItem>
                                <SelectItem value="faulty">Défectueux</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addAntenna} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une antenne
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transmission */}
            <TabsContent value="transmission">
              <Card>
                <CardHeader>
                  <CardTitle>Équipement de transmission</CardTitle>
                  <CardDescription>Modifiez les équipements de transmission installés sur ce site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {transmissionEquipment.map((equipment, index) => (
                      <div key={equipment.id} className="space-y-4 p-4 border rounded-md relative">
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTransmissionEquipment(equipment.id)}
                            type="button"
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>

                        <h3 className="font-medium">Équipement de transmission {index + 1}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`transmission-model-${equipment.id}`}>
                              Modèle <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`transmission-model-${equipment.id}`}
                              placeholder="Ex: Huawei OptiX RTN 950"
                              value={equipment.model}
                              onChange={(e) => updateTransmissionEquipment(equipment.id, "model", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`transmission-type-${equipment.id}`}>
                              Type <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={equipment.type}
                              onValueChange={(value) => updateTransmissionEquipment(equipment.id, "type", value)}
                            >
                              <SelectTrigger id={`transmission-type-${equipment.id}`}>
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="microwave">Micro-onde</SelectItem>
                                <SelectItem value="fiber">Fibre optique</SelectItem>
                                <SelectItem value="satellite">Satellite</SelectItem>
                                <SelectItem value="ethernet">Ethernet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`transmission-capacity-${equipment.id}`}>
                              Capacité <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`transmission-capacity-${equipment.id}`}
                              placeholder="Ex: 1Gbps, 10Gbps"
                              value={equipment.capacity}
                              onChange={(e) => updateTransmissionEquipment(equipment.id, "capacity", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`transmission-status-${equipment.id}`}>Statut</Label>
                            <Select
                              value={equipment.status}
                              onValueChange={(value) => updateTransmissionEquipment(equipment.id, "status", value)}
                            >
                              <SelectTrigger id={`transmission-status-${equipment.id}`}>
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operational">Opérationnel</SelectItem>
                                <SelectItem value="maintenance">En maintenance</SelectItem>
                                <SelectItem value="faulty">Défectueux</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addTransmissionEquipment} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un équipement de transmission
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Radio Equipment */}
            <TabsContent value="radio">
              <Card>
                <CardHeader>
                  <CardTitle>Équipement radio</CardTitle>
                  <CardDescription>Modifiez les équipements radio installés sur ce site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {radioEquipment.map((equipment, index) => (
                      <div key={equipment.id} className="space-y-4 p-4 border rounded-md relative">
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRadioEquipment(equipment.id)}
                            type="button"
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>

                        <h3 className="font-medium">Équipement radio {index + 1}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`radio-model-${equipment.id}`}>
                              Modèle <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`radio-model-${equipment.id}`}
                              placeholder="Ex: Huawei BBU3900"
                              value={equipment.model}
                              onChange={(e) => updateRadioEquipment(equipment.id, "model", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`radio-type-${equipment.id}`}>
                              Type <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={equipment.type}
                              onValueChange={(value) => updateRadioEquipment(equipment.id, "type", value)}
                            >
                              <SelectTrigger id={`radio-type-${equipment.id}`}>
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bbu">BBU (Baseband Unit)</SelectItem>
                                <SelectItem value="rru">RRU (Remote Radio Unit)</SelectItem>
                                <SelectItem value="bts">BTS (Base Transceiver Station)</SelectItem>
                                <SelectItem value="nodeb">Node B</SelectItem>
                                <SelectItem value="enodeb">eNode B</SelectItem>
                                <SelectItem value="gnodeb">gNode B</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`radio-technology-${equipment.id}`}>
                              Technologie <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={equipment.technology}
                              onValueChange={(value) => updateRadioEquipment(equipment.id, "technology", value)}
                            >
                              <SelectTrigger id={`radio-technology-${equipment.id}`}>
                                <SelectValue placeholder="Sélectionner une technologie" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2G">2G</SelectItem>
                                <SelectItem value="3G">3G</SelectItem>
                                <SelectItem value="4G">4G</SelectItem>
                                <SelectItem value="5G">5G</SelectItem>
                                <SelectItem value="multi">Multi-technologie</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`radio-status-${equipment.id}`}>Statut</Label>
                            <Select
                              value={equipment.status}
                              onValueChange={(value) => updateRadioEquipment(equipment.id, "status", value)}
                            >
                              <SelectTrigger id={`radio-status-${equipment.id}`}>
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operational">Opérationnel</SelectItem>
                                <SelectItem value="maintenance">En maintenance</SelectItem>
                                <SelectItem value="faulty">Défectueux</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addRadioEquipment} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un équipement radio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" type="button" onClick={() => router.push("/manager/sites")}>
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
