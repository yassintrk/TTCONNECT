"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TechnicianLayout } from "@/components/technician/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  Save,
  FileText,
  Calendar,
  Clock,
  PenToolIcon as Tool,
  Radio,
} from "lucide-react"

export default function TechnicianProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

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
      // Vérifier si l'utilisateur est un technicien
      if (user.role !== "technician") {
        router.push("/login")
        return
      }

      setUserData(user)
      setIsLoading(false)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été mises à jour avec succès.",
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
    <TechnicianLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profil Technicien</h2>
          <p className="text-muted-foreground">Gérez vos informations personnelles et paramètres</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Votre profil et vos coordonnées</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Photo de profil" />
                <AvatarFallback className="text-3xl">AB</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{userData?.fullName || "Ahmed Benali"}</h3>
              <p className="text-sm text-muted-foreground mb-2">Technicien Senior</p>
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">Disponible</Badge>
              <div className="w-full space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ID: TECH-001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ahmed.benali@tunisietelecom.tn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+216 XX XXX XXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Dernière connexion: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600">
                <FileText className="h-4 w-4 mr-2" />
                Télécharger CV
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
              <CardDescription>Gérez vos préférences et informations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">Général</TabsTrigger>
                  <TabsTrigger value="security">Sécurité</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="competences">Compétences</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input id="fullName" defaultValue={userData?.fullName || "Ahmed Benali"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="ahmed.benali@tunisietelecom.tn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="+216 XX XXX XXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Poste</Label>
                      <Input id="position" defaultValue="Technicien Senior" disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                      defaultValue="Technicien expérimenté avec plus de 5 ans d'expérience dans la maintenance des équipements GSM. Spécialisé dans les interventions sur les sites 4G et 5G."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" defaultValue="Tunis, Tunisie" />
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </Button>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_password">Mot de passe actuel</Label>
                      <Input id="current_password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password">Nouveau mot de passe</Label>
                      <Input id="new_password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm_password">Confirmer le mot de passe</Label>
                      <Input id="confirm_password" type="password" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium">Options de sécurité</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Authentification à deux facteurs</h4>
                        <p className="text-xs text-muted-foreground">
                          Ajouter une couche de sécurité supplémentaire à votre compte
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Sessions actives</h4>
                        <p className="text-xs text-muted-foreground">Gérer vos sessions actives</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Gérer
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Mettre à jour la sécurité
                  </Button>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications par email</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications dans l'application</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications dans l'application</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications SMS</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <h3 className="font-medium">Types de notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_interventions" defaultChecked />
                        <Label htmlFor="notif_interventions">Nouvelles interventions assignées</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_tickets" defaultChecked />
                        <Label htmlFor="notif_tickets">Mises à jour des tickets</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_sites" defaultChecked />
                        <Label htmlFor="notif_sites">Changements sur les sites assignés</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_reports" />
                        <Label htmlFor="notif_reports">Rapports disponibles</Label>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                    <Bell className="h-4 w-4 mr-2" />
                    Enregistrer les préférences
                  </Button>
                </TabsContent>

                <TabsContent value="competences" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Compétences techniques</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Maintenance équipements 4G/5G</span>
                          <span className="text-sm text-muted-foreground">95%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Installation antennes</span>
                          <span className="text-sm text-muted-foreground">90%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Configuration réseau</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Diagnostic pannes</span>
                          <span className="text-sm text-muted-foreground">92%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <h3 className="font-medium">Certifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h4 className="text-sm font-medium">Certification Huawei 5G</h4>
                          <p className="text-xs text-muted-foreground">Obtenue en 2022</p>
                        </div>
                        <Badge>Avancé</Badge>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h4 className="text-sm font-medium">Certification Nokia Networks</h4>
                          <p className="text-xs text-muted-foreground">Obtenue en 2021</p>
                        </div>
                        <Badge>Intermédiaire</Badge>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h4 className="text-sm font-medium">Certification Ericsson Radio</h4>
                          <p className="text-xs text-muted-foreground">Obtenue en 2020</p>
                        </div>
                        <Badge>Expert</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <h3 className="font-medium">Spécialités</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50">
                        Antennes 4G/5G
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        Maintenance préventive
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50">
                        Diagnostic avancé
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50">
                        Configuration BBU
                      </Badge>
                      <Badge variant="outline" className="bg-red-50">
                        Intervention d'urgence
                      </Badge>
                      <Badge variant="outline" className="bg-orange-50">
                        Installation RRU
                      </Badge>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                    <Tool className="h-4 w-4 mr-2" />
                    Mettre à jour les compétences
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Historique de vos dernières actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Intervention terminée",
                  description: "Intervention INT-2021 terminée avec succès",
                  date: "Aujourd'hui, 13:45",
                  icon: <Calendar className="h-5 w-5 text-green-500" />,
                },
                {
                  action: "Mise à jour d'intervention",
                  description: "Intervention INT-2022 mise à jour - Statut changé à 'En cours'",
                  date: "Aujourd'hui, 09:30",
                  icon: <Tool className="h-5 w-5 text-orange-500" />,
                },
                {
                  action: "Création de ticket",
                  description: "Ticket TKT-1023 créé pour le site TUN-GSM-042",
                  date: "Hier, 14:30",
                  icon: <FileText className="h-5 w-5 text-blue-500" />,
                },
                {
                  action: "Visite de site",
                  description: "Visite effectuée au site NBL-GSM-073",
                  date: "22/05/2023, 08:15",
                  icon: <Radio className="h-5 w-5 text-purple-500" />,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{activity.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{activity.action}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  )
}
