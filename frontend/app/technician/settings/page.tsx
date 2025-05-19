"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TechnicianLayout } from "@/components/technician/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { User, Bell, Shield, Save } from "lucide-react"

export default function SettingsPage() {
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

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres ont été enregistrés avec succès.",
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
          <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">Gérez vos préférences et paramètres de compte</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations de profil</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input id="fullName" defaultValue={userData?.fullName || "Ahmed Benali"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="ahmed.benali@example.com" />
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
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                    defaultValue="Technicien expérimenté avec plus de 5 ans d'expérience dans la maintenance des équipements GSM."
                  ></textarea>
                </div>

                <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer les modifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>Configurez comment vous souhaitez être notifié</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer les préférences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>Gérez la sécurité de votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
                  <Save className="h-4 w-4 mr-2" />
                  Mettre à jour le mot de passe
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TechnicianLayout>
  )
}
