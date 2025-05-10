"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Bell,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Home,
  LogOut,
  MapPin,
  Menu,
  MoreVertical,
  Plus,
  Radio,
  Search,
  Settings,
  Signal,
  PenToolIcon as Tool,
  User,
  X,
  Mail,
  Phone,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isAddSiteDialogOpen, setIsAddSiteDialogOpen] = useState(false)
  const [isAddAlertDialogOpen, setIsAddAlertDialogOpen] = useState(false)
  const [isAddInterventionDialogOpen, setIsAddInterventionDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false)
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null)
  const [selectedSite, setSelectedSite] = useState<any | null>(null)

  // Données pour les sites GSM
  const [sites, setSites] = useState([
    {
      id: "TUN-GSM-042",
      name: "Tunis Centre",
      type: "Macro",
      status: "Actif",
      address: "Avenue Habib Bourguiba, Tunis",
      coordinates: "36.8065, 10.1815",
      technology: ["2G", "3G", "4G"],
      capacity: 85,
      lastMaintenance: "15/04/2023",
      equipments: [
        { id: "ANT-001", type: "Antenne", model: "Huawei ATR4518R6", status: "Opérationnel" },
        { id: "BBU-002", type: "BBU", model: "Huawei BBU3900", status: "Opérationnel" },
        { id: "RRU-003", type: "RRU", model: "Huawei RRU3953", status: "Opérationnel" },
      ],
    },
    {
      id: "SFX-GSM-118",
      name: "Sfax Nord",
      type: "Micro",
      status: "Actif",
      address: "Route de Tunis, Sfax",
      coordinates: "34.7478, 10.7661",
      technology: ["2G", "3G", "4G", "5G"],
      capacity: 72,
      lastMaintenance: "03/03/2023",
      equipments: [
        { id: "ANT-004", type: "Antenne", model: "Nokia AAHF", status: "Opérationnel" },
        { id: "BBU-005", type: "BBU", model: "Nokia AirScale", status: "Opérationnel" },
        { id: "RRU-006", type: "RRU", model: "Nokia AirScale", status: "Maintenance requise" },
      ],
    },
    {
      id: "NBL-GSM-073",
      name: "Nabeul Est",
      type: "Macro",
      status: "Maintenance",
      address: "Avenue Habib Bourguiba, Nabeul",
      coordinates: "36.4513, 10.7381",
      technology: ["2G", "3G", "4G"],
      capacity: 65,
      lastMaintenance: "22/02/2023",
      equipments: [
        { id: "ANT-007", type: "Antenne", model: "Ericsson AIR 3246", status: "Maintenance requise" },
        { id: "BBU-008", type: "BBU", model: "Ericsson Baseband 6630", status: "Opérationnel" },
        { id: "RRU-009", type: "RRU", model: "Ericsson Radio 4443", status: "Défectueux" },
      ],
    },
    {
      id: "BZT-GSM-091",
      name: "Bizerte Port",
      type: "Micro",
      status: "Actif",
      address: "Port de Bizerte, Bizerte",
      coordinates: "37.2744, 9.8739",
      technology: ["2G", "3G", "4G"],
      capacity: 78,
      lastMaintenance: "10/01/2023",
      equipments: [
        { id: "ANT-010", type: "Antenne", model: "ZTE ZXSDR B8200", status: "Opérationnel" },
        { id: "BBU-011", type: "BBU", model: "ZTE ZXSDR B8300", status: "Opérationnel" },
        { id: "RRU-012", type: "RRU", model: "ZTE ZXSDR R8862", status: "Opérationnel" },
      ],
    },
    {
      id: "SUS-GSM-054",
      name: "Sousse Plage",
      type: "Macro",
      status: "Inactif",
      address: "Boulevard du 14 Janvier, Sousse",
      coordinates: "35.8245, 10.6346",
      technology: ["2G", "3G"],
      capacity: 45,
      lastMaintenance: "05/12/2022",
      equipments: [
        { id: "ANT-013", type: "Antenne", model: "Huawei ATR4518R6", status: "Défectueux" },
        { id: "BBU-014", type: "BBU", model: "Huawei BBU3900", status: "Défectueux" },
        { id: "RRU-015", type: "RRU", model: "Huawei RRU3953", status: "Défectueux" },
      ],
    },
  ])

  // Données pour les alertes
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-1023",
      site: "TUN-GSM-042",
      severity: "high",
      message: "Panne d'alimentation",
      time: "Il y a 35 min",
      status: "Non résolu",
      details: "Perte totale d'alimentation électrique. Générateur de secours activé.",
    },
    {
      id: "ALT-1022",
      site: "SFX-GSM-118",
      severity: "medium",
      message: "Dégradation du signal",
      time: "Il y a 2h",
      status: "En cours",
      details: "Baisse de performance sur les secteurs Nord et Est. Interférence détectée.",
    },
    {
      id: "ALT-1021",
      site: "NBL-GSM-073",
      severity: "low",
      message: "Température élevée",
      time: "Il y a 4h",
      status: "En cours",
      details: "Température du shelter au-dessus de 35°C. Système de refroidissement à vérifier.",
    },
    {
      id: "ALT-1020",
      site: "BZT-GSM-091",
      severity: "medium",
      message: "Connectivité réduite",
      time: "Il y a 6h",
      status: "Non résolu",
      details: "Perte de connectivité sur le lien de transmission principal. Basculement sur lien secondaire effectué.",
    },
    {
      id: "ALT-1019",
      site: "SUS-GSM-054",
      severity: "high",
      message: "Perte de connexion",
      time: "Il y a 8h",
      status: "Résolu",
      details: "Site complètement hors service. Problème résolu par redémarrage des équipements.",
    },
  ])

  // Données pour les interventions
  const [interventions, setInterventions] = useState([
    {
      id: "INT-2023",
      site: "TUN-GSM-042",
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
    },
    {
      id: "INT-2022",
      site: "SFX-GSM-118",
      type: "Mise à jour",
      status: "En cours",
      date: "25/05/2023",
      tech: "Sonia M.",
      description: "Mise à jour des équipements pour support 5G",
      tasks: ["Installation nouveaux modules", "Configuration réseau", "Tests de couverture"],
    },
    {
      id: "INT-2021",
      site: "NBL-GSM-073",
      type: "Corrective",
      status: "Terminée",
      date: "22/05/2023",
      tech: "Karim H.",
      description: "Remplacement RRU défectueux",
      tasks: ["Démontage ancien RRU", "Installation nouveau RRU", "Configuration", "Tests"],
    },
    {
      id: "INT-2020",
      site: "BZT-GSM-091",
      type: "Inspection",
      status: "Terminée",
      date: "20/05/2023",
      tech: "Leila T.",
      description: "Inspection suite à alerte de sécurité",
      tasks: ["Vérification accès site", "Contrôle équipements", "Rapport d'inspection"],
    },
    {
      id: "INT-2019",
      site: "SUS-GSM-054",
      type: "Urgence",
      status: "Terminée",
      date: "18/05/2023",
      tech: "Mohamed R.",
      description: "Intervention d'urgence suite à panne totale",
      tasks: ["Diagnostic", "Remplacement alimentation", "Redémarrage système", "Tests"],
    },
  ])

  // Données pour les KPIs
  const networkKPIs = {
    availability: 99.2,
    callDropRate: 1.8,
    dataSuccessRate: 97.5,
    avgThroughput: 42.3, // Mbps
    latency: 28, // ms
    coverageQuality: 86,
  }

  // Données pour les équipements
  const equipmentTypes = [
    { type: "Antennes", count: 3750, operational: 3650 },
    { type: "BBU", count: 1248, operational: 1220 },
    { type: "RRU", count: 3744, operational: 3680 },
    { type: "Alimentations", count: 1248, operational: 1235 },
    { type: "Climatiseurs", count: 1248, operational: 1210 },
  ]

  // État pour stocker les résultats de recherche
  const [filteredSites, setFilteredSites] = useState(sites)
  const [filteredAlerts, setFilteredAlerts] = useState(alerts)
  const [filteredInterventions, setFilteredInterventions] = useState(interventions)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() === "") {
      toast({
        title: "Recherche vide",
        description: "Veuillez entrer un terme de recherche",
      })
      return
    }

    setSearchPerformed(true)
    const query = searchQuery.toLowerCase()

    // Recherche dans les sites
    const matchingSites = sites.filter(
      (site) =>
        site.id.toLowerCase().includes(query) ||
        site.name.toLowerCase().includes(query) ||
        site.type.toLowerCase().includes(query) ||
        site.status.toLowerCase().includes(query) ||
        site.address.toLowerCase().includes(query) ||
        site.technology.some((tech) => tech.toLowerCase().includes(query)),
    )

    // Recherche dans les alertes
    const matchingAlerts = alerts.filter(
      (alert) =>
        alert.id.toLowerCase().includes(query) ||
        alert.site.toLowerCase().includes(query) ||
        alert.message.toLowerCase().includes(query) ||
        alert.status.toLowerCase().includes(query) ||
        alert.details.toLowerCase().includes(query),
    )

    // Recherche dans les interventions
    const matchingInterventions = interventions.filter(
      (intervention) =>
        intervention.id.toLowerCase().includes(query) ||
        intervention.site.toLowerCase().includes(query) ||
        intervention.type.toLowerCase().includes(query) ||
        intervention.status.toLowerCase().includes(query) ||
        intervention.tech.toLowerCase().includes(query) ||
        intervention.description.toLowerCase().includes(query) ||
        intervention.tasks.some((task) => task.toLowerCase().includes(query)),
    )

    // Mettre à jour les résultats filtrés
    setFilteredSites(matchingSites)
    setFilteredAlerts(matchingAlerts)
    setFilteredInterventions(matchingInterventions)

    // Déterminer vers quel onglet rediriger en fonction des résultats
    if (
      matchingSites.length > 0 &&
      matchingSites.length >= matchingAlerts.length &&
      matchingSites.length >= matchingInterventions.length
    ) {
      setActiveTab("sites")
      toast({
        title: "Recherche effectuée",
        description: `${matchingSites.length} site(s) trouvé(s) pour "${searchQuery}"`,
      })
    } else if (
      matchingAlerts.length > 0 &&
      matchingAlerts.length >= matchingSites.length &&
      matchingAlerts.length >= matchingInterventions.length
    ) {
      setActiveTab("alerts")
      toast({
        title: "Recherche effectuée",
        description: `${matchingAlerts.length} alerte(s) trouvée(s) pour "${searchQuery}"`,
      })
    } else if (matchingInterventions.length > 0) {
      setActiveTab("interventions")
      toast({
        title: "Recherche effectuée",
        description: `${matchingInterventions.length} intervention(s) trouvée(s) pour "${searchQuery}"`,
      })
    } else {
      toast({
        title: "Aucun résultat",
        description: `Aucun résultat trouvé pour "${searchQuery}"`,
      })
    }
  }

  // Fonction pour réinitialiser la recherche
  const resetSearch = () => {
    setSearchPerformed(false)
    setFilteredSites(sites)
    setFilteredAlerts(alerts)
    setFilteredInterventions(interventions)
    setSearchQuery("")
  }

  const handleResolveAlert = (alertId: string) => {
    const updatedAlerts = alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "Résolu" } : alert))
    setAlerts(updatedAlerts)
    setFilteredAlerts(updatedAlerts)
    toast({
      title: "Alerte résolue",
      description: `L'alerte ${alertId} a été marquée comme résolue.`,
    })
  }

  const handleViewSiteDetails = (siteId: string) => {
    const site = sites.find((s) => s.id === siteId)
    if (site) {
      setSelectedSite(site)
      setSelectedSiteId(siteId)
      toast({
        title: "Détails du site",
        description: `Affichage des détails du site ${siteId}.`,
      })
    }
  }

  const handleViewEquipment = (siteId: string) => {
    const site = sites.find((s) => s.id === siteId)
    if (site) {
      setSelectedSite(site)
      setIsEquipmentDialogOpen(true)
    }
  }

  const handleDeleteSite = (siteId: string) => {
    const updatedSites = sites.filter((site) => site.id !== siteId)
    setSites(updatedSites)
    setFilteredSites(updatedSites)
    toast({
      title: "Site supprimé",
      description: `Le site ${siteId} a été supprimé avec succès.`,
    })
  }

  const handleDeleteAlert = (alertId: string) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== alertId)
    setAlerts(updatedAlerts)
    setFilteredAlerts(updatedAlerts)
    toast({
      title: "Alerte supprimée",
      description: `L'alerte ${alertId} a été supprimée avec succès.`,
    })
  }

  const handleDeleteIntervention = (interventionId: string) => {
    const updatedInterventions = interventions.filter((intervention) => intervention.id !== interventionId)
    setInterventions(updatedInterventions)
    setFilteredInterventions(updatedInterventions)
    toast({
      title: "Intervention supprimée",
      description: `L'intervention ${interventionId} a été supprimée avec succès.`,
    })
  }

  const handleCompleteIntervention = (interventionId: string) => {
    const updatedInterventions = interventions.map((intervention) =>
      intervention.id === interventionId ? { ...intervention, status: "Terminée" } : intervention,
    )
    setInterventions(updatedInterventions)
    setFilteredInterventions(updatedInterventions)
    toast({
      title: "Intervention terminée",
      description: `L'intervention ${interventionId} a été marquée comme terminée.`,
    })
  }

  const handleGenerateReport = () => {
    setIsReportDialogOpen(true)
  }

  const handleExportReport = () => {
    toast({
      title: "Rapport exporté",
      description: "Le rapport a été exporté avec succès au format PDF.",
    })
    setIsReportDialogOpen(false)
  }

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Vous avez consulté vos notifications.",
    })
  }

  const handleProfileAction = (action: string) => {
  if (action === "Profil") {
    setIsProfileDialogOpen(true)
  } else if (action === "Déconnexion") {
    // Remove token from localStorage
    localStorage.removeItem("adminToken")
    

    // Optional: show toast before redirect
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    })

    // Redirect to login page after a short delay to let the toast show
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  } else {
    toast({
      title: "Action de profil",
      description: `Vous avez sélectionné : ${action}`,
    })
  }
}

  const handlePagination = (page: number) => {
    setCurrentPage(page)
    toast({
      title: "Pagination",
      description: `Navigation vers la page ${page}.`,
    })
  }

  const handleSettingsClick = () => {
    toast({
      title: "Paramètres",
      description: "Ouverture des paramètres du système.",
    })
  }

  const handleHelpClick = () => {
    toast({
      title: "Aide",
      description: "Ouverture de l'aide du système.",
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <MobileSidebar
            setActiveTab={setActiveTab}
            onSettingsClick={handleSettingsClick}
            onHelpClick={handleHelpClick}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
        <DesktopSidebar
          setActiveTab={setActiveTab}
          onSettingsClick={handleSettingsClick}
          onHelpClick={handleHelpClick}
        />
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
              <Radio className="h-5 w-5 text-orange-500" />
              <h1 className="text-xl font-semibold text-orange-500">Tunisie Télécom GSM Manager</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Recherche */}
              <form onSubmit={handleSearch} className="relative hidden md:flex">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher sites, alertes, interventions..."
                  className="w-64 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => {
                      setSearchQuery("")
                      resetSearch()
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Effacer la recherche</span>
                  </Button>
                )}
              </form>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" onClick={handleNotifications}>
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setActiveTab("alerts")
                      toast({
                        title: "Alertes consultées",
                        description: "Vous avez accédé à la section des alertes.",
                      })
                    }}
                  >
                    <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">Nouvelles alertes disponibles</span>
                      <span className="text-xs text-muted-foreground">
                        Plusieurs alertes nécessitent votre attention
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setActiveTab("interventions")
                      toast({
                        title: "Interventions consultées",
                        description: "Vous avez consulté les interventions planifiées pour aujourd'hui.",
                      })
                    }}
                  >
                    <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">Interventions planifiées aujourd'hui</span>
                      <span className="text-xs text-muted-foreground">2 interventions à effectuer</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setActiveTab("sites")
                      toast({
                        title: "Sites consultés",
                        description: "Vous avez consulté les sites nécessitant une maintenance.",
                      })
                    }}
                  >
                    <Tool className="h-4 w-4 text-orange-500 mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">Maintenance requise</span>
                      <span className="text-xs text-muted-foreground">3 sites nécessitent une maintenance</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profil utilisateur */}
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
                  <DropdownMenuItem onClick={() => handleProfileAction("Profil")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileAction("Paramètres")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileAction("Aide")}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Aide</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleProfileAction("Déconnexion")}>
                    <LogOut className="mr-2 h-4 w-4" />
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
                <p className="text-muted-foreground">
                  Bienvenue sur votre interface de gestion des sites GSM de Tunisie Télécom.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleGenerateReport} className="bg-orange-500 hover:bg-orange-600">
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
                  <Signal className="h-4 w-4 text-orange-500" />
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
                  <Activity className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <Progress value={78} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interventions Planifiées</CardTitle>
                  <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Pour les 7 prochains jours</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="sites">Sites</TabsTrigger>
                <TabsTrigger value="alerts">Alertes</TabsTrigger>
                <TabsTrigger value="interventions">Interventions</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="equipment">Équipements</TabsTrigger>
              </TabsList>

              {/* Vue d'ensemble */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* Carte des Sites */}
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Carte des Sites</CardTitle>
                      <CardDescription>Vue géographique des sites GSM de Tunisie Télécom</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-orange-500" />
                        <span className="ml-2 text-muted-foreground">Carte interactive des sites</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Alertes Récentes */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Alertes Récentes</CardTitle>
                      <CardDescription>Dernières alertes signalées</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {alerts.slice(0, 4).map((alert) => (
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
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("alerts")}>
                        Voir toutes les alertes
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* KPIs du Réseau */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance du Réseau</CardTitle>
                    <CardDescription>Indicateurs clés de performance du réseau</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Disponibilité du réseau</span>
                          <span className="text-sm text-green-500">{networkKPIs.availability}%</span>
                        </div>
                        <Progress value={networkKPIs.availability} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Taux d'appels interrompus</span>
                          <span className="text-sm text-amber-500">{networkKPIs.callDropRate}%</span>
                        </div>
                        <Progress value={100 - networkKPIs.callDropRate * 10} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Taux de succès des données</span>
                          <span className="text-sm text-green-500">{networkKPIs.dataSuccessRate}%</span>
                        </div>
                        <Progress value={networkKPIs.dataSuccessRate} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Débit moyen</span>
                          <span className="text-sm text-green-500">{networkKPIs.avgThroughput} Mbps</span>
                        </div>
                        <Progress value={(networkKPIs.avgThroughput / 50) * 100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Latence</span>
                          <span className="text-sm text-green-500">{networkKPIs.latency} ms</span>
                        </div>
                        <Progress value={100 - (networkKPIs.latency / 50) * 100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Qualité de couverture</span>
                          <span className="text-sm text-green-500">{networkKPIs.coverageQuality}%</span>
                        </div>
                        <Progress value={networkKPIs.coverageQuality} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Répartition des Technologies */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Répartition des Technologies */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition des Technologies</CardTitle>
                      <CardDescription>Distribution des technologies sur les sites</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <span className="text-sm font-medium">2G</span>
                          </div>
                          <span className="text-sm">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm font-medium">3G</span>
                          </div>
                          <span className="text-sm">98%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium">4G</span>
                          </div>
                          <span className="text-sm">85%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <span className="text-sm font-medium">5G</span>
                          </div>
                          <span className="text-sm">12%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* État des Équipements */}
                  <Card>
                    <CardHeader>
                      <CardTitle>État des Équipements</CardTitle>
                      <CardDescription>Aperçu de l'état des équipements réseau</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {equipmentTypes.map((equipment, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{equipment.type}</span>
                              <span className="text-sm text-green-500">
                                {((equipment.operational / equipment.count) * 100).toFixed(1)}% opérationnels
                              </span>
                            </div>
                            <Progress value={(equipment.operational / equipment.count) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Interventions Récentes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interventions Récentes</CardTitle>
                    <CardDescription>Dernières interventions effectuées sur les sites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                        <div>ID</div>
                        <div>Site</div>
                        <div>Type</div>
                        <div>Technicien</div>
                        <div>Statut</div>
                      </div>
                      {interventions.slice(0, 5).map((intervention) => (
                        <div key={intervention.id} className="grid grid-cols-5 gap-4 p-4 border-b items-center">
                          <div className="font-medium">{intervention.id}</div>
                          <div>{intervention.site}</div>
                          <div>{intervention.type}</div>
                          <div>{intervention.tech}</div>
                          <div>
                            <Badge
                              variant={
                                intervention.status === "Terminée"
                                  ? "default"
                                  : intervention.status === "En cours"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {intervention.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("interventions")}>
                      Voir toutes les interventions
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Sites */}
              <TabsContent value="sites" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Liste des Sites GSM</CardTitle>
                      <CardDescription>Gérez tous vos sites de stations de base</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {searchPerformed && (
                        <Button variant="outline" size="sm" onClick={resetSearch}>
                          <X className="mr-2 h-4 w-4" />
                          Effacer la recherche
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => setIsAddSiteDialogOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un site
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                        <div>ID Site</div>
                        <div>Nom</div>
                        <div>Type</div>
                        <div>Statut</div>
                        <div>Technologies</div>
                        <div>Capacité</div>
                        <div>Actions</div>
                      </div>
                      {filteredSites.map((site) => (
                        <div key={site.id} className="grid grid-cols-7 gap-4 p-4 border-b items-center">
                          <div className="font-medium">{site.id}</div>
                          <div>{site.name}</div>
                          <div>{site.type}</div>
                          <div>
                            <Badge
                              variant={
                                site.status === "Actif"
                                  ? "default"
                                  : site.status === "Maintenance"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {site.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {site.technology.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div>
                            <Progress value={site.capacity} className="h-2 w-20" />
                            <span className="text-xs text-muted-foreground">{site.capacity}%</span>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewSiteDetails(site.id)}>
                                  Détails
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleViewEquipment(site.id)}>
                                  Équipements
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setActiveTab("interventions")}>
                                  Planifier intervention
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteSite(site.id)}>Supprimer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                      {filteredSites.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          Aucun site ne correspond à votre recherche
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => handlePagination(currentPage > 1 ? currentPage - 1 : 1)}>
                      Précédent
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 ${currentPage === 1 ? "bg-orange-500 text-white" : ""}`}
                        onClick={() => handlePagination(1)}
                      >
                        1
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 ${currentPage === 2 ? "bg-orange-500 text-white" : ""}`}
                        onClick={() => handlePagination(2)}
                      >
                        2
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 ${currentPage === 3 ? "bg-orange-500 text-white" : ""}`}
                        onClick={() => handlePagination(3)}
                      >
                        3
                      </Button>
                    </div>
                    <Button variant="outline" onClick={() => handlePagination(currentPage < 3 ? currentPage + 1 : 3)}>
                      Suivant
                    </Button>
                  </CardFooter>
                </Card>

                {/* Détails du site sélectionné */}
                {selectedSite && (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Détails du Site: {selectedSite.id}</CardTitle>
                          <CardDescription>{selectedSite.name}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setSelectedSite(null)}>
                          <X className="mr-2 h-4 w-4" />
                          Fermer
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">Informations générales</h3>
                            <Separator className="my-2" />
                            <dl className="space-y-2">
                              <div className="flex justify-between">
                                <dt className="text-sm text-muted-foreground">Type:</dt>
                                <dd className="text-sm font-medium">{selectedSite.type}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-sm text-muted-foreground">Statut:</dt>
                                <dd className="text-sm font-medium">{selectedSite.status}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-sm text-muted-foreground">Adresse:</dt>
                                <dd className="text-sm font-medium">{selectedSite.address}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-sm text-muted-foreground">Coordonnées:</dt>
                                <dd className="text-sm font-medium">{selectedSite.coordinates}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-sm text-muted-foreground">Dernière maintenance:</dt>
                                <dd className="text-sm font-medium">{selectedSite.lastMaintenance}</dd>
                              </div>
                            </dl>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium">Technologies</h3>
                            <Separator className="my-2" />
                            <div className="flex flex-wrap gap-2">
                              {selectedSite.technology.map((tech, index) => (
                                <Badge key={index} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">Capacité et performance</h3>
                            <Separator className="my-2" />
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Capacité actuelle:</span>
                                <span className="text-sm font-medium">{selectedSite.capacity}%</span>
                              </div>
                              <Progress value={selectedSite.capacity} className="h-2" />
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium">Équipements</h3>
                            <Separator className="my-2" />
                            <div className="space-y-2">
                              {selectedSite.equipments.map((equipment, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div>
                                    <span className="text-sm font-medium">
                                      {equipment.type} - {equipment.model}
                                    </span>
                                    <p className="text-xs text-muted-foreground">{equipment.id}</p>
                                  </div>
                                  <Badge
                                    variant={
                                      equipment.status === "Opérationnel"
                                        ? "default"
                                        : equipment.status === "Maintenance requise"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {equipment.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("interventions")}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Planifier une intervention
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <Tool className="mr-2 h-4 w-4" />
                        Gérer les équipements
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>

              {/* Alertes */}
              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Gestion des Alertes</CardTitle>
                      <CardDescription>Surveillez et gérez les alertes du réseau</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {searchPerformed && (
                        <Button variant="outline" size="sm" onClick={resetSearch}>
                          <X className="mr-2 h-4 w-4" />
                          Effacer la recherche
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => setIsAddAlertDialogOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter une alerte
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredAlerts.map((alert) => (
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
                                    ? "default"
                                    : alert.status === "En cours"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {alert.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                            <p className="text-sm">{alert.details}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => setActiveTab("interventions")}>
                                Planifier intervention
                              </Button>
                              {alert.status !== "Résolu" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleResolveAlert(alert.id)}
                                  className="bg-orange-500 hover:bg-orange-600"
                                >
                                  Résoudre
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => handleDeleteAlert(alert.id)}
                              >
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredAlerts.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          Aucune alerte ne correspond à votre recherche
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interventions */}
              <TabsContent value="interventions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Planification des Interventions</CardTitle>
                        <CardDescription>Gérez les interventions de maintenance</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {searchPerformed && (
                          <Button variant="outline" size="sm" onClick={resetSearch}>
                            <X className="mr-2 h-4 w-4" />
                            Effacer la recherche
                          </Button>
                        )}
                        <Button
                          onClick={() => setIsAddInterventionDialogOpen(true)}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Planifier
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Interventions à venir</h3>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                            <div>ID</div>
                            <div>Site</div>
                            <div>Type</div>
                            <div>Date</div>
                            <div>Technicien</div>
                            <div>Statut</div>
                            <div>Actions</div>
                          </div>
                          {filteredInterventions.map((intervention) => (
                            <div key={intervention.id} className="grid grid-cols-7 gap-4 p-4 border-b items-center">
                              <div className="font-medium">{intervention.id}</div>
                              <div>{intervention.site}</div>
                              <div>{intervention.type}</div>
                              <div>{intervention.date}</div>
                              <div>{intervention.tech}</div>
                              <div>
                                <Badge
                                  variant={
                                    intervention.status === "Terminée"
                                      ? "default"
                                      : intervention.status === "En cours"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {intervention.status}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Détails</DropdownMenuItem>
                                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                                    {intervention.status !== "Terminée" && (
                                      <DropdownMenuItem onClick={() => handleCompleteIntervention(intervention.id)}>
                                        Marquer comme terminée
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={() => handleDeleteIntervention(intervention.id)}>
                                      Supprimer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                          {filteredInterventions.length === 0 && (
                            <div className="p-4 text-center text-muted-foreground">
                              Aucune intervention ne correspond à votre recherche
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Détails d'intervention */}
                <Card>
                  <CardHeader>
                    <CardTitle>Détails des Interventions</CardTitle>
                    <CardDescription>Informations détaillées sur les interventions planifiées</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {filteredInterventions.slice(0, 2).map((intervention) => (
                        <div key={intervention.id} className="rounded-lg border p-4">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="text-lg font-medium">{intervention.description}</h3>
                              <p className="text-sm text-muted-foreground">
                                {intervention.site} - {intervention.date}
                              </p>
                            </div>
                            <Badge
                              variant={
                                intervention.status === "Terminée"
                                  ? "default"
                                  : intervention.status === "En cours"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {intervention.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Technicien: {intervention.tech}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tool className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Type: {intervention.type}</span>
                            </div>
                          </div>
                          <div className="mt-4">
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
                          <div className="mt-4 flex justify-end gap-2">
                            {intervention.status !== "Terminée" && (
                              <Button
                                size="sm"
                                onClick={() => handleCompleteIntervention(intervention.id)}
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                Marquer comme terminée
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Rapport d'intervention
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance */}
              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance du Réseau</CardTitle>
                    <CardDescription>Analyse détaillée des performances du réseau GSM</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Graphique de performance */}
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <BarChart2 className="h-8 w-8 text-orange-500" />
                        <span className="ml-2 text-muted-foreground">Graphique de performance du réseau</span>
                      </div>

                      {/* KPIs détaillés */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Disponibilité du réseau</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-500">{networkKPIs.availability}%</div>
                            <Progress value={networkKPIs.availability} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">+0.3% par rapport au mois dernier</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Taux d'appels interrompus</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-amber-500">{networkKPIs.callDropRate}%</div>
                            <Progress value={100 - networkKPIs.callDropRate * 10} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">-0.2% par rapport au mois dernier</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Taux de succès des données</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-500">{networkKPIs.dataSuccessRate}%</div>
                            <Progress value={networkKPIs.dataSuccessRate} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">+0.5% par rapport au mois dernier</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Débit moyen</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-500">{networkKPIs.avgThroughput} Mbps</div>
                            <Progress value={(networkKPIs.avgThroughput / 50) * 100} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">+2.3 Mbps par rapport au mois dernier</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Latence</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-500">{networkKPIs.latency} ms</div>
                            <Progress value={100 - (networkKPIs.latency / 50) * 100} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">-2 ms par rapport au mois dernier</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Qualité de couverture</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-500">{networkKPIs.coverageQuality}%</div>
                            <Progress value={networkKPIs.coverageQuality} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">+1.2% par rapport au mois dernier</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Analyse par région */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Performance par région</h3>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                            <div>Région</div>
                            <div>Disponibilité</div>
                            <div>Appels interrompus</div>
                            <div>Succès données</div>
                            <div>Débit moyen</div>
                            <div>Couverture</div>
                          </div>
                          {[
                            {
                              region: "Tunis",
                              availability: 99.5,
                              callDropRate: 1.2,
                              dataSuccessRate: 98.3,
                              avgThroughput: 45.7,
                              coverage: 92,
                            },
                            {
                              region: "Sfax",
                              availability: 98.9,
                              callDropRate: 1.8,
                              dataSuccessRate: 97.2,
                              avgThroughput: 42.1,
                              coverage: 88,
                            },
                            {
                              region: "Sousse",
                              availability: 99.1,
                              callDropRate: 1.5,
                              dataSuccessRate: 97.8,
                              avgThroughput: 43.5,
                              coverage: 90,
                            },
                            {
                              region: "Bizerte",
                              availability: 98.7,
                              callDropRate: 2.1,
                              dataSuccessRate: 96.9,
                              avgThroughput: 40.2,
                              coverage: 85,
                            },
                            {
                              region: "Nabeul",
                              availability: 99.0,
                              callDropRate: 1.7,
                              dataSuccessRate: 97.5,
                              avgThroughput: 41.8,
                              coverage: 87,
                            },
                          ].map((region, index) => (
                            <div key={index} className="grid grid-cols-6 gap-4 p-4 border-b items-center">
                              <div className="font-medium">{region.region}</div>
                              <div className="text-green-500">{region.availability}%</div>
                              <div className="text-amber-500">{region.callDropRate}%</div>
                              <div className="text-green-500">{region.dataSuccessRate}%</div>
                              <div>{region.avgThroughput} Mbps</div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Progress value={region.coverage} className="h-2 w-20" />
                                  <span>{region.coverage}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Générer un rapport détaillé
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Équipements */}
              <TabsContent value="equipment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des Équipements</CardTitle>
                    <CardDescription>Inventaire et état des équipements réseau</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Résumé des équipements */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {equipmentTypes.map((equipment, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">{equipment.type}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{equipment.count}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress
                                  value={(equipment.operational / equipment.count) * 100}
                                  className="h-2 flex-1"
                                />
                                <span className="text-xs text-green-500">
                                  {((equipment.operational / equipment.count) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {equipment.operational} opérationnels
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Liste des équipements */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Inventaire des équipements</h3>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Filter className="mr-2 h-4 w-4" />
                              Filtrer
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Exporter
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                            <div>ID</div>
                            <div>Type</div>
                            <div>Modèle</div>
                            <div>Site</div>
                            <div>Statut</div>
                            <div>Dernière maintenance</div>
                            <div>Actions</div>
                          </div>
                          {sites
                            .flatMap((site) =>
                              site.equipments.map((equipment) => ({
                                ...equipment,
                                siteName: site.name,
                                siteId: site.id,
                                lastMaintenance: site.lastMaintenance,
                              })),
                            )
                            .slice(0, 10)
                            .map((equipment, index) => (
                              <div key={index} className="grid grid-cols-7 gap-4 p-4 border-b items-center">
                                <div className="font-medium">{equipment.id}</div>
                                <div>{equipment.type}</div>
                                <div>{equipment.model}</div>
                                <div>{equipment.siteId}</div>
                                <div>
                                  <Badge
                                    variant={
                                      equipment.status === "Opérationnel"
                                        ? "default"
                                        : equipment.status === "Maintenance requise"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {equipment.status}
                                  </Badge>
                                </div>
                                <div>{equipment.lastMaintenance}</div>
                                <div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Détails</DropdownMenuItem>
                                      <DropdownMenuItem>Historique</DropdownMenuItem>
                                      <DropdownMenuItem>Planifier maintenance</DropdownMenuItem>
                                      <DropdownMenuItem>Remplacer</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Statistiques d'équipements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>État des équipements par fabricant</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { name: "Huawei", operational: 95, maintenance: 3, defective: 2 },
                                { name: "Ericsson", operational: 92, maintenance: 5, defective: 3 },
                                { name: "Nokia", operational: 94, maintenance: 4, defective: 2 },
                                { name: "ZTE", operational: 91, maintenance: 6, defective: 3 },
                              ].map((vendor, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">{vendor.name}</span>
                                  </div>
                                  <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div className="bg-green-500" style={{ width: `${vendor.operational}%` }}></div>
                                    <div className="bg-amber-500" style={{ width: `${vendor.maintenance}%` }}></div>
                                    <div className="bg-red-500" style={{ width: `${vendor.defective}%` }}></div>
                                  </div>
                                  <div className="flex text-xs justify-between">
                                    <span className="text-green-500">{vendor.operational}% Opérationnels</span>
                                    <span className="text-amber-500">{vendor.maintenance}% Maintenance</span>
                                    <span className="text-red-500">{vendor.defective}% Défectueux</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Équipements nécessitant une attention</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                {
                                  id: "RRU-009",
                                  type: "RRU",
                                  model: "Ericsson Radio 4443",
                                  site: "NBL-GSM-073",
                                  issue: "Défectueux - Signal faible",
                                  priority: "high",
                                },
                                {
                                  id: "BBU-014",
                                  type: "BBU",
                                  model: "Huawei BBU3900",
                                  site: "SUS-GSM-054",
                                  issue: "Défectueux - Redémarrages fréquents",
                                  priority: "high",
                                },
                                {
                                  id: "RRU-006",
                                  type: "RRU",
                                  model: "Nokia AirScale",
                                  site: "SFX-GSM-118",
                                  issue: "Maintenance requise - Performance dégradée",
                                  priority: "medium",
                                },
                                {
                                  id: "ANT-013",
                                  type: "Antenne",
                                  model: "Huawei ATR4518R6",
                                  site: "SUS-GSM-054",
                                  issue: "Défectueux - Désalignement",
                                  priority: "high",
                                },
                              ].map((equipment, index) => (
                                <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                                  <div className="flex-shrink-0">
                                    <AlertTriangle
                                      className={`h-5 w-5 ${
                                        equipment.priority === "high"
                                          ? "text-destructive"
                                          : equipment.priority === "medium"
                                            ? "text-amber-500"
                                            : "text-yellow-500"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium">
                                        {equipment.type} - {equipment.id}
                                      </p>
                                      <Badge
                                        variant={
                                          equipment.priority === "high"
                                            ? "destructive"
                                            : equipment.priority === "medium"
                                              ? "default"
                                              : "outline"
                                        }
                                      >
                                        {equipment.priority === "high"
                                          ? "Urgent"
                                          : equipment.priority === "medium"
                                            ? "Moyen"
                                            : "Faible"}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {equipment.model} - Site: {equipment.site}
                                    </p>
                                    <p className="text-sm mt-1">{equipment.issue}</p>
                                    <Button variant="outline" size="sm" className="mt-2">
                                      Planifier intervention
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Dialogue de profil du technicien */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Profil du Technicien</DialogTitle>
            <DialogDescription>Informations détaillées et statistiques de performance</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* En-tête du profil */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-2">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Mohamed Trabelsi" />
                  <AvatarFallback className="text-2xl">MT</AvatarFallback>
                </Avatar>
                <Badge className="mt-2" variant="outline">
                  TECH-042
                </Badge>
              </div>

              <div className="flex-1 space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold">Mohamed Trabelsi</h2>
                <p className="text-muted-foreground">Technicien Senior - Maintenance Réseau</p>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">mohamed.trabelsi@tunisietelecom.tn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+216 55 123 456</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tunis, Tunisie</span>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Interventions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">248</div>
                  <p className="text-xs text-muted-foreground">Interventions réalisées</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Sites Gérés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">Sites sous responsabilité</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Taux de Réussite</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">97%</div>
                  <p className="text-xs text-muted-foreground">Interventions réussies</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Temps de Réponse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45 min</div>
                  <p className="text-xs text-muted-foreground">Temps moyen de réponse</p>
                </CardContent>
              </Card>
            </div>

            {/* Compétences */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Compétences</h3>
              <div className="space-y-4">
                {[
                  { name: "Maintenance GSM", level: 95 },
                  { name: "Dépannage Réseau", level: 90 },
                  { name: "Installation Antennes", level: 85 },
                  { name: "Configuration Systèmes", level: 80 },
                  { name: "Analyse de Signal", level: 75 },
                ].map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Interventions récentes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Interventions Récentes</h3>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Date</div>
                  <div>Site</div>
                  <div>Type</div>
                  <div>Statut</div>
                </div>
                {[
                  {
                    date: "25/05/2023",
                    site: "TUN-GSM-042",
                    type: "Maintenance préventive",
                    status: "Complété",
                  },
                  {
                    date: "22/05/2023",
                    site: "SFX-GSM-118",
                    type: "Mise à jour logicielle",
                    status: "Complété",
                  },
                  {
                    date: "18/05/2023",
                    site: "NBL-GSM-073",
                    type: "Remplacement d'équipement",
                    status: "Complété",
                  },
                ].map((intervention, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b items-center">
                    <div>{intervention.date}</div>
                    <div>{intervention.site}</div>
                    <div>{intervention.type}</div>
                    <div>
                      <Badge variant="default">{intervention.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
              Fermer
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Modifier le profil</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialogue de rapport */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rapport détaillé du réseau GSM</DialogTitle>
            <DialogDescription>
              Généré le {new Date().toLocaleDateString()} à {new Date().toLocaleTimeString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Section Résumé */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Résumé du réseau</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Sites GSM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-500">1,205 actifs</span> |
                      <span className="text-amber-500"> 31 en maintenance</span> |
                      <span className="text-red-500"> 12 inactifs</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Alertes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-red-500">8 critiques</span> |
                      <span className="text-amber-500"> 10 moyennes</span> |
                      <span className="text-yellow-500"> 6 faibles</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground">
                      Interventions planifiées pour les 7 prochains jours
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section Performance */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Performance du réseau</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Disponibilité du réseau</span>
                      <span className="text-sm text-green-500">{networkKPIs.availability}%</span>
                    </div>
                    <Progress value={networkKPIs.availability} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Taux d'appels interrompus</span>
                      <span className="text-sm text-amber-500">{networkKPIs.callDropRate}%</span>
                    </div>
                    <Progress value={100 - networkKPIs.callDropRate * 10} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Taux de succès des données</span>
                      <span className="text-sm text-green-500">{networkKPIs.dataSuccessRate}%</span>
                    </div>
                    <Progress value={networkKPIs.dataSuccessRate} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Débit moyen</span>
                      <span className="text-sm text-green-500">{networkKPIs.avgThroughput} Mbps</span>
                    </div>
                    <Progress value={(networkKPIs.avgThroughput / 50) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Latence</span>
                      <span className="text-sm text-green-500">{networkKPIs.latency} ms</span>
                    </div>
                    <Progress value={100 - (networkKPIs.latency / 50) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Qualité de couverture</span>
                      <span className="text-sm text-green-500">{networkKPIs.coverageQuality}%</span>
                    </div>
                    <Progress value={networkKPIs.coverageQuality} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section Alertes */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Alertes actives</h3>
              <div className="space-y-4">
                {alerts
                  .filter((alert) => alert.status !== "Résolu")
                  .map((alert) => (
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
                                ? "default"
                                : alert.status === "En cours"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                        <p className="text-sm">{alert.details}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Fermer
            </Button>
            <Button onClick={handleExportReport} className="bg-orange-500 hover:bg-orange-600">
              Exporter en PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'équipements */}
      <Dialog open={isEquipmentDialogOpen} onOpenChange={setIsEquipmentDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Équipements du site {selectedSite?.id}</DialogTitle>
            <DialogDescription>{selectedSite?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                <div>ID</div>
                <div>Type</div>
                <div>Modèle</div>
                <div>Statut</div>
                <div>Actions</div>
              </div>
              {selectedSite?.equipments.map((equipment, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b items-center">
                  <div className="font-medium">{equipment.id}</div>
                  <div>{equipment.type}</div>
                  <div>{equipment.model}</div>
                  <div>
                    <Badge
                      variant={
                        equipment.status === "Opérationnel"
                          ? "default"
                          : equipment.status === "Maintenance requise"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {equipment.status}
                    </Badge>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Détails</DropdownMenuItem>
                        <DropdownMenuItem>Historique</DropdownMenuItem>
                        <DropdownMenuItem>Planifier maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Remplacer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-4">Ajouter un équipement</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="equipment-type">Type d'équipement</label>
                    <select
                      id="equipment-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Antenne">Antenne</option>
                      <option value="BBU">BBU</option>
                      <option value="RRU">RRU</option>
                      <option value="Alimentation">Alimentation</option>
                      <option value="Climatiseur">Climatiseur</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="equipment-model">Modèle</label>
                    <Input id="equipment-model" placeholder="Ex: Huawei ATR4518R6" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="equipment-status">Statut</label>
                    <select
                      id="equipment-status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Opérationnel">Opérationnel</option>
                      <option value="Maintenance requise">Maintenance requise</option>
                      <option value="Défectueux">Défectueux</option>
                    </select>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Ajouter l'équipement</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Statistiques des équipements</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Équipements opérationnels</span>
                    <span className="text-sm text-green-500">
                      {selectedSite?.equipments.filter((eq) => eq.status === "Opérationnel").length}/
                      {selectedSite?.equipments.length}
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedSite?.equipments.filter((eq) => eq.status === "Opérationnel").length /
                        selectedSite?.equipments.length) *
                      100
                    }
                    className="h-2"
                  />

                  <div className="rounded-md border p-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Répartition par type</h4>
                    <div className="space-y-2">
                      {["Antenne", "BBU", "RRU"].map((type) => {
                        const count = selectedSite?.equipments.filter((eq) => eq.type === type).length || 0
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <span className="text-sm">{type}</span>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="rounded-md border p-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Dernières mises à jour</h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Dernière maintenance:</span>{" "}
                        <span className="font-medium">{selectedSite?.lastMaintenance}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Prochain contrôle prévu:</span>{" "}
                        <span className="font-medium">15/06/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setIsEquipmentDialogOpen(false)}>
              Fermer
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Tool className="mr-2 h-4 w-4" />
              Planifier une maintenance
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'ajout de site */}
      <Dialog open={isAddSiteDialogOpen} onOpenChange={setIsAddSiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau site</DialogTitle>
            <DialogDescription>Entrez les informations du nouveau site GSM à ajouter au système.</DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="id">ID du site</label>
                <Input id="id" placeholder="Ex: TUN-GSM-123" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="name">Nom du site</label>
                <Input id="name" placeholder="Ex: Tunis Centre" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="address">Adresse</label>
                <Input id="address" placeholder="Ex: Avenue Habib Bourguiba, Tunis" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="coordinates">Coordonnées GPS</label>
                <Input id="coordinates" placeholder="Ex: 36.8065, 10.1815" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Macro">Macro</option>
                    <option value="Micro">Micro</option>
                    <option value="Pico">Pico</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="status">Statut</label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label>Technologies</label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tech-2g" className="h-4 w-4" defaultChecked />
                    <label htmlFor="tech-2g">2G</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tech-3g" className="h-4 w-4" defaultChecked />
                    <label htmlFor="tech-3g">3G</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tech-4g" className="h-4 w-4" defaultChecked />
                    <label htmlFor="tech-4g">4G</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tech-5g" className="h-4 w-4" />
                    <label htmlFor="tech-5g">5G</label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'ajout d'alerte */}
      <Dialog open={isAddAlertDialogOpen} onOpenChange={setIsAddAlertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle alerte</DialogTitle>
            <DialogDescription>Entrez les informations de la nouvelle alerte à signaler.</DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="site">Site concerné</label>
                <select
                  id="site"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Sélectionnez un site</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.id} - {site.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="severity">Sévérité</label>
                <select
                  id="severity"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">Message</label>
                <Input id="message" placeholder="Description courte de l'alerte" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="details">Détails</label>
                <textarea
                  id="details"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Description détaillée du problème"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'ajout d'intervention */}
      <Dialog open={isAddInterventionDialogOpen} onOpenChange={setIsAddInterventionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Planifier une intervention</DialogTitle>
            <DialogDescription>
              Remplissez les détails pour planifier une nouvelle intervention de maintenance.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="int-site">Site</label>
                <select
                  id="int-site"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Sélectionnez un site</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.id} - {site.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="int-type">Type d'intervention</label>
                <select
                  id="int-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="Préventive">Préventive</option>
                  <option value="Corrective">Corrective</option>
                  <option value="Mise à jour">Mise à jour</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Urgence">Urgence</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="int-date">Date prévue</label>
                <Input id="int-date" type="date" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="int-tech">Technicien assigné</label>
                <select
                  id="int-tech"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Sélectionnez un technicien</option>
                  <option value="Ahmed B.">Ahmed B.</option>
                  <option value="Sonia M.">Sonia M.</option>
                  <option value="Karim H.">Karim H.</option>
                  <option value="Leila T.">Leila T.</option>
                  <option value="Mohamed R.">Mohamed R.</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="int-description">Description</label>
                <Input id="int-description" placeholder="Description de l'intervention" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="int-tasks">Tâches à effectuer</label>
                <textarea
                  id="int-tasks"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Liste des tâches à effectuer (une par ligne)"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Planifier
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Mobile Sidebar Component
function MobileSidebar({
  setActiveTab,
  onSettingsClick,
  onHelpClick,
}: {
  setActiveTab: (tab: string) => void
  onSettingsClick: () => void
  onHelpClick: () => void
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Radio className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500">Tunisie Télécom GSM</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-orange-500 transition-all hover:text-orange-500"
            onClick={() => setActiveTab("overview")}
          >
            <Home className="h-5 w-5" />
            Tableau de bord
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("sites")}
          >
            <Radio className="h-5 w-5" />
            Sites GSM
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("alerts")}
          >
            <AlertTriangle className="h-5 w-5" />
            Alertes
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("interventions")}
          >
            <Calendar className="h-5 w-5" />
            Interventions
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("performance")}
          >
            <Activity className="h-5 w-5" />
            Performance
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("equipment")}
          >
            <Tool className="h-5 w-5" />
            Équipements
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onHelpClick}
        >
          <HelpCircle className="h-5 w-5" />
          Aide
        </Link>
      </div>
    </div>
  )
}

// Desktop Sidebar Component
function DesktopSidebar({
  setActiveTab,
  onSettingsClick,
  onHelpClick,
}: {
  setActiveTab: (tab: string) => void
  onSettingsClick: () => void
  onHelpClick: () => void
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Radio className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500">Tunisie Télécom GSM</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-orange-500 transition-all hover:text-orange-500"
            onClick={() => setActiveTab("overview")}
          >
            <Home className="h-5 w-5" />
            Tableau de bord
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("sites")}
          >
            <Radio className="h-5 w-5" />
            Sites GSM
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("alerts")}
          >
            <AlertTriangle className="h-5 w-5" />
            Alertes
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("interventions")}
          >
            <Calendar className="h-5 w-5" />
            Interventions
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("performance")}
          >
            <Activity className="h-5 w-5" />
            Performance
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveTab("equipment")}
          >
            <Tool className="h-5 w-5" />
            Équipements
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onHelpClick}
        >
          <HelpCircle className="h-5 w-5" />
          Aide
        </Link>
      </div>
    </div>
  )
}
