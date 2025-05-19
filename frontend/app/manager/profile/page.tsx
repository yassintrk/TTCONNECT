"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ManagerLayout } from "@/components/manager/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { User, Mail, Phone, Shield, Bell, Save, FileText, Calendar, Clock } from "lucide-react"

export default function ManagerProfilePage() {
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
      // Vérifier si l'utilisateur est un manager
      if (user.role !== "manager") {
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
    <ManagerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profil Manager</h2>
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
                <AvatarFallback className="text-3xl">NN</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{userData?.fullName || "Nidhal Nsiri"}</h3>
              <p className="text-sm text-muted-foreground mb-4">Manager GSM</p>
              <div className="w-full space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ID: MGR-001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">nidhal.nsiri@tunisietelecom.tn</span>
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
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input id="fullName" defaultValue={userData?.fullName || "Nidhal Nsiri"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="nidhal.nsiri@tunisietelecom.tn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="+216 XX XXX XXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Poste</Label>
                      <Input id="position" defaultValue="Manager GSM" disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                      defaultValue="Manager expérimenté avec plus de 10 ans d'expérience dans la gestion des équipes techniques et des infrastructures GSM. Spécialisé dans l'optimisation des processus et l'amélioration de la qualité de service."
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
                        <Label htmlFor="notif_interventions">Nouvelles interventions</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_tickets" defaultChecked />
                        <Label htmlFor="notif_tickets">Nouveaux tickets d'incidents</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_sites" defaultChecked />
                        <Label htmlFor="notif_sites">Mises à jour des sites</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notif_reports" defaultChecked />
                        <Label htmlFor="notif_reports">Rapports disponibles</Label>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                    <Bell className="h-4 w-4 mr-2" />
                    Enregistrer les préférences
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
                  action: "Planification d'intervention",
                  description: "Intervention planifiée pour le site TUN-GSM-042",
                  date: "Aujourd'hui, 10:30",
                  icon: <Calendar className="h-5 w-5 text-orange-500" />,
                },
                {
                  action: "Création de ticket",
                  description: "Ticket créé pour le site SFX-GSM-118",
                  date: "Hier, 15:45",
                  icon: <FileText className="h-5 w-5 text-blue-500" />,
                },
                {
                  action: "Mise à jour de profil",
                  description: "Informations de profil mises à jour",
                  date: "23/05/2023, 09:15",
                  icon: <User className="h-5 w-5 text-green-500" />,
                },
                {
                  action: "Connexion",
                  description: "Connexion au système",
                  date: "23/05/2023, 09:00",
                  icon: <Shield className="h-5 w-5 text-purple-500" />,
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
    </ManagerLayout>
  )
}
