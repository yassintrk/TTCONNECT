"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type FormErrors = {
  [key: string]: string
}

export default function AddSitePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
    type: "",
    height: "",
    power: "",
    coverage: "",
    description: "",
    equipment: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [name]: value,
      },
    }))

    // Clear error when field is edited
    if (errors[`coordinates.${name}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`coordinates.${name}`]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = "Le nom du site est requis"
    if (!formData.location.trim()) newErrors.location = "L'emplacement est requis"
    if (!formData.coordinates.latitude.trim()) newErrors["coordinates.latitude"] = "La latitude est requise"
    if (!formData.coordinates.longitude.trim()) newErrors["coordinates.longitude"] = "La longitude est requise"
    if (!formData.type) newErrors.type = "Le type de site est requis"
    if (!formData.height.trim()) newErrors.height = "La hauteur de l'antenne est requise"
    if (!formData.power.trim()) newErrors.power = "La puissance est requise"

    // Numeric validation
    if (formData.coordinates.latitude && isNaN(Number(formData.coordinates.latitude))) {
      newErrors["coordinates.latitude"] = "La latitude doit être un nombre"
    }
    if (formData.coordinates.longitude && isNaN(Number(formData.coordinates.longitude))) {
      newErrors["coordinates.longitude"] = "La longitude doit être un nombre"
    }
    if (formData.height && isNaN(Number(formData.height))) {
      newErrors.height = "La hauteur doit être un nombre"
    }
    if (formData.power && isNaN(Number(formData.power))) {
      newErrors.power = "La puissance doit être un nombre"
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Nouveau site créé:", formData)

      toast({
        title: "Site créé avec succès",
        description: `Le site ${formData.name} a été ajouté.`,
        variant: "default",
      })

      setIsSubmitting(false)

      // Redirect to sites list after successful creation
      router.push("/manager/sites")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ajouter un nouveau site</h1>
          <p className="text-gray-600">Créez un nouveau site GSM avec toutes les informations nécessaires</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/manager/sites")} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour à la liste
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du site</CardTitle>
          <CardDescription>Remplissez les informations requises pour créer un nouveau site GSM</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Informations générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nom du site <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                      placeholder="Ex: Site Tunis Centre"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Emplacement <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={errors.location ? "border-red-500" : ""}
                      placeholder="Ex: Tunis, Avenue Habib Bourguiba"
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="latitude">
                      Latitude <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      value={formData.coordinates.latitude}
                      onChange={handleCoordinatesChange}
                      className={errors["coordinates.latitude"] ? "border-red-500" : ""}
                      placeholder="Ex: 36.8065"
                    />
                    {errors["coordinates.latitude"] && (
                      <p className="text-red-500 text-sm">{errors["coordinates.latitude"]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">
                      Longitude <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      value={formData.coordinates.longitude}
                      onChange={handleCoordinatesChange}
                      className={errors["coordinates.longitude"] ? "border-red-500" : ""}
                      placeholder="Ex: 10.1815"
                    />
                    {errors["coordinates.longitude"] && (
                      <p className="text-red-500 text-sm">{errors["coordinates.longitude"]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">
                      Type de site <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urbain">Urbain</SelectItem>
                        <SelectItem value="Côtier">Côtier</SelectItem>
                        <SelectItem value="Industriel">Industriel</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                        <SelectItem value="Montagneux">Montagneux</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Spécifications techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">
                      Hauteur de l'antenne (m) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className={errors.height ? "border-red-500" : ""}
                      placeholder="Ex: 45"
                    />
                    {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power">
                      Puissance (W) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="power"
                      name="power"
                      value={formData.power}
                      onChange={handleChange}
                      className={errors.power ? "border-red-500" : ""}
                      placeholder="Ex: 100"
                    />
                    {errors.power && <p className="text-red-500 text-sm">{errors.power}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverage">Couverture (km)</Label>
                    <Input
                      id="coverage"
                      name="coverage"
                      value={formData.coverage}
                      onChange={handleChange}
                      placeholder="Ex: 5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipment">Équipement</Label>
                    <Input
                      id="equipment"
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleChange}
                      placeholder="Ex: Ericsson RBS 6000"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description détaillée du site..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/manager/sites")}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700 text-white">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Création en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Créer le site
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
