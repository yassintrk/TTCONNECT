"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  FileText,
  HelpCircle,
  Home,
  Layers,
  MapPin,
  Menu,
  MoreVertical,
  Radio,
  Search,
  Settings,
  Signal,
  User,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
        <DesktopSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold text-primary">GSM Site Manager</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:flex">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher..." className="w-64 pl-8" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>TT</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex text-sm font-medium">Technicien</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Aide</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <X className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Tableau de bord</h2>
                <p className="text-muted-foreground">Bienvenue sur votre interface de gestion des sites GSM.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Générer un rapport
                </Button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sites Actifs</CardTitle>
                  <Signal className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+12 depuis le mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">-3 depuis hier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Capacité Réseau</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <Progress value={78} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interventions Planifiées</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Pour les 7 prochains jours</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="sites">Sites</TabsTrigger>
                <TabsTrigger value="alerts">Alertes</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* Map View */}
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Carte des Sites</CardTitle>
                      <CardDescription>Vue géographique de tous les sites GSM</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Carte interactive des sites</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Alerts */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Alertes Récentes</CardTitle>
                      <CardDescription>Dernières alertes signalées</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            id: "ALT-1023",
                            site: "TUN-GSM-042",
                            severity: "high",
                            message: "Panne d'alimentation",
                            time: "Il y a 35 min",
                          },
                          {
                            id: "ALT-1022",
                            site: "SFX-GSM-118",
                            severity: "medium",
                            message: "Dégradation du signal",
                            time: "Il y a 2h",
                          },
                          {
                            id: "ALT-1021",
                            site: "NBL-GSM-073",
                            severity: "low",
                            message: "Température élevée",
                            time: "Il y a 4h",
                          },
                          {
                            id: "ALT-1020",
                            site: "BZT-GSM-091",
                            severity: "medium",
                            message: "Connectivité réduite",
                            time: "Il y a 6h",
                          },
                        ].map((alert) => (
                          <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-3">
                            <div className="flex-shrink-0">
                              <AlertTriangle
                                className={`h-5 w-5 ${
                                  alert.severity === "high"
                                    ? "text-destructive"
                                    : alert.severity === "medium"
                                      ? "text-amber-500"
                                      : "text-yellow-500"
                                }`}
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{alert.message}</p>
                                <Badge
                                  variant={
                                    alert.severity === "high"
                                      ? "destructive"
                                      : alert.severity === "medium"
                                        ? "default"
                                        : "outline"
                                  }
                                >
                                  {alert.id}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">Site: {alert.site}</p>
                              <p className="text-xs text-muted-foreground">{alert.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Voir toutes les alertes
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance du Réseau</CardTitle>
                    <CardDescription>Métriques de performance des 30 derniers jours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Graphique de performance</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Activités Récentes</CardTitle>
                      <CardDescription>Dernières interventions et mises à jour</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Filtrer par type</DropdownMenuItem>
                        <DropdownMenuItem>Filtrer par date</DropdownMenuItem>
                        <DropdownMenuItem>Exporter</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          user: "Ahmed B.",
                          action: "Maintenance préventive effectuée",
                          site: "TUN-GSM-042",
                          time: "Aujourd'hui, 10:23",
                          status: "completed",
                        },
                        {
                          user: "Sonia M.",
                          action: "Mise à jour du firmware",
                          site: "SFX-GSM-118",
                          time: "Hier, 15:47",
                          status: "completed",
                        },
                        {
                          user: "Karim H.",
                          action: "Remplacement d'équipement",
                          site: "NBL-GSM-073",
                          time: "Hier, 09:12",
                          status: "completed",
                        },
                        {
                          user: "Leila T.",
                          action: "Inspection de site",
                          site: "BZT-GSM-091",
                          time: "22/02/2025, 14:30",
                          status: "pending",
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={activity.user} />
                            <AvatarFallback>
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{activity.user}</p>
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                            <p className="text-sm">{activity.action}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{activity.site}</Badge>
                              {activity.status === "completed" ? (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  Complété
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  En attente
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Voir toutes les activités
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="sites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Liste des Sites GSM</CardTitle>
                    <CardDescription>Gérez tous vos sites de stations de base</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                        <div>ID Site</div>
                        <div>Localisation</div>
                        <div>Type</div>
                        <div>Statut</div>
                        <div>Actions</div>
                      </div>
                      {[
                        { id: "TUN-GSM-042", location: "Tunis Centre", type: "Macro", status: "Actif" },
                        { id: "SFX-GSM-118", location: "Sfax Nord", type: "Micro", status: "Actif" },
                        { id: "NBL-GSM-073", location: "Nabeul Est", type: "Macro", status: "Maintenance" },
                        { id: "BZT-GSM-091", location: "Bizerte Port", type: "Micro", status: "Actif" },
                        { id: "SUS-GSM-054", location: "Sousse Plage", type: "Macro", status: "Inactif" },
                      ].map((site) => (
                        <div key={site.id} className="grid grid-cols-5 gap-4 p-4 border-b items-center">
                          <div className="font-medium">{site.id}</div>
                          <div>{site.location}</div>
                          <div>{site.type}</div>
                          <div>
                            <Badge
                              variant={
                                site.status === "Actif"
                                  ? "success"
                                  : site.status === "Maintenance"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {site.status}
                            </Badge>
                          </div>
                          <div>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Précédent</Button>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        1
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        2
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        3
                      </Button>
                    </div>
                    <Button variant="outline">Suivant</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des Alertes</CardTitle>
                    <CardDescription>Surveillez et gérez les alertes du réseau</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "ALT-1023",
                          site: "TUN-GSM-042",
                          severity: "high",
                          message: "Panne d'alimentation",
                          time: "Il y a 35 min",
                          status: "Non résolu",
                        },
                        {
                          id: "ALT-1022",
                          site: "SFX-GSM-118",
                          severity: "medium",
                          message: "Dégradation du signal",
                          time: "Il y a 2h",
                          status: "En cours",
                        },
                        {
                          id: "ALT-1021",
                          site: "NBL-GSM-073",
                          severity: "low",
                          message: "Température élevée",
                          time: "Il y a 4h",
                          status: "En cours",
                        },
                        {
                          id: "ALT-1020",
                          site: "BZT-GSM-091",
                          severity: "medium",
                          message: "Connectivité réduite",
                          time: "Il y a 6h",
                          status: "Non résolu",
                        },
                        {
                          id: "ALT-1019",
                          site: "SUS-GSM-054",
                          severity: "high",
                          message: "Perte de connexion",
                          time: "Il y a 8h",
                          status: "Résolu",
                        },
                      ].map((alert) => (
                        <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="flex-shrink-0">
                            <AlertTriangle
                              className={`h-5 w-5 ${
                                alert.severity === "high"
                                  ? "text-destructive"
                                  : alert.severity === "medium"
                                    ? "text-amber-500"
                                    : "text-yellow-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{alert.message}</p>
                              <Badge
                                variant={
                                  alert.severity === "high"
                                    ? "destructive"
                                    : alert.severity === "medium"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {alert.id}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Site: {alert.site}</Badge>
                              <Badge
                                variant={
                                  alert.status === "Résolu"
                                    ? "success"
                                    : alert.status === "En cours"
                                      ? "warning"
                                      : "destructive"
                                }
                              >
                                {alert.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                              {alert.status !== "Résolu" && <Button size="sm">Résoudre</Button>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Planification de Maintenance</CardTitle>
                    <CardDescription>Gérez les interventions de maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Interventions à venir</h3>
                        <Button>
                          <Calendar className="mr-2 h-4 w-4" />
                          Planifier
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                          <div>Date</div>
                          <div>Site</div>
                          <div>Type</div>
                          <div>Technicien</div>
                          <div>Actions</div>
                        </div>
                        {[
                          { date: "28/02/2025", site: "TUN-GSM-042", type: "Préventive", tech: "Ahmed B." },
                          { date: "01/03/2025", site: "SFX-GSM-118", type: "Mise à jour", tech: "Sonia M." },
                          { date: "03/03/2025", site: "NBL-GSM-073", type: "Corrective", tech: "Karim H." },
                          { date: "05/03/2025", site: "BZT-GSM-091", type: "Inspection", tech: "Leila T." },
                        ].map((task, index) => (
                          <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b items-center">
                            <div>{task.date}</div>
                            <div>{task.site}</div>
                            <div>{task.type}</div>
                            <div>{task.tech}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                              <Button variant="outline" size="sm">
                                Modifier
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Historique de maintenance</h3>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                            <div>Date</div>
                            <div>Site</div>
                            <div>Type</div>
                            <div>Technicien</div>
                            <div>Statut</div>
                          </div>
                          {[
                            {
                              date: "20/02/2025",
                              site: "TUN-GSM-042",
                              type: "Préventive",
                              tech: "Ahmed B.",
                              status: "Complété",
                            },
                            {
                              date: "18/02/2025",
                              site: "SFX-GSM-118",
                              type: "Mise à jour",
                              tech: "Sonia M.",
                              status: "Complété",
                            },
                            {
                              date: "15/02/2025",
                              site: "NBL-GSM-073",
                              type: "Corrective",
                              tech: "Karim H.",
                              status: "Complété",
                            },
                            {
                              date: "10/02/2025",
                              site: "BZT-GSM-091",
                              type: "Inspection",
                              tech: "Leila T.",
                              status: "Complété",
                            },
                          ].map((task, index) => (
                            <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b items-center">
                              <div>{task.date}</div>
                              <div>{task.site}</div>
                              <div>{task.type}</div>
                              <div>{task.tech}</div>
                              <div>
                                <Badge variant="success">{task.status}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

// Mobile Sidebar Component
function MobileSidebar() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Radio className="h-5 w-5 text-primary" />
          <span className="text-primary">GSM Site Manager</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground">
            <Home className="h-5 w-5" />
            Tableau de bord
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Radio className="h-5 w-5" />
            Sites GSM
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <AlertTriangle className="h-5 w-5" />
            Alertes
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Activity className="h-5 w-5" />
            Performance
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Layers className="h-5 w-5" />
            Inventaire
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Calendar className="h-5 w-5" />
            Maintenance
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="h-5 w-5" />
            Équipe
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-5 w-5" />
            Rapports
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <HelpCircle className="h-5 w-5" />
          Aide
        </Link>
      </div>
    </div>
  )
}

// Desktop Sidebar Component
function DesktopSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Radio className="h-5 w-5 text-primary" />
          <span className="text-primary">GSM Site Manager</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground">
            <Home className="h-5 w-5" />
            Tableau de bord
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Radio className="h-5 w-5" />
            Sites GSM
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <AlertTriangle className="h-5 w-5" />
            Alertes
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Activity className="h-5 w-5" />
            Performance
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Layers className="h-5 w-5" />
            Inventaire
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Calendar className="h-5 w-5" />
            Maintenance
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="h-5 w-5" />
            Équipe
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-5 w-5" />
            Rapports
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <HelpCircle className="h-5 w-5" />
          Aide
        </Link>
      </div>
    </div>
  )
}

// Missing component definition
function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

