"use client"

import { useState, useEffect } from "react"
import { Users, UserCog, AlertTriangle, Activity, Clock, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    technicians: 0,
    managers: 0,
    activeAlerts: 0,
    pendingInterventions: 0,
    completedInterventions: 0,
  })

  useEffect(() => {
    // Simuler le chargement des données
    const loadData = () => {
      setStats({
        totalUsers: 24,
        technicians: 18,
        managers: 6,
        activeAlerts: 3,
        pendingInterventions: 12,
        completedInterventions: 87,
      })
    }

    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord administrateur</h1>
        <p className="text-gray-600">Bienvenue dans votre portail d'administration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistiques simplifiées sans composants externes */}
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <Users className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Utilisateurs totaux</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalUsers}</p>
              <p className="mt-1 text-sm text-gray-500">Tous les utilisateurs actifs</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <UserCog className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Techniciens</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.technicians}</p>
              <p className="mt-1 text-sm text-gray-500">Techniciens sur le terrain</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800">
              <UserCog className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Managers</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.managers}</p>
              <p className="mt-1 text-sm text-gray-500">Managers de site</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-800">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Alertes actives</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.activeAlerts}</p>
              <p className="mt-1 text-sm text-gray-500">Alertes nécessitant attention</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-800">
              <Clock className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Interventions en attente</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.pendingInterventions}</p>
              <p className="mt-1 text-sm text-gray-500">Interventions planifiées</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-teal-100 text-teal-800">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Interventions terminées</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.completedInterventions}</p>
              <p className="mt-1 text-sm text-gray-500">Ce mois-ci</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertes de sécurité simplifiées */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Alertes de sécurité
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-red-50 text-red-800">
              <h4 className="font-medium">Utilisateur: tech_ahmed</h4>
              <p className="text-sm">Connexion depuis un nouvel appareil détectée</p>
              <p className="text-xs text-gray-500 mt-1">Il y a 10 minutes</p>
            </div>
            <div className="p-4 rounded-lg border bg-orange-50 text-orange-800">
              <h4 className="font-medium">Utilisateur: manager_sarah</h4>
              <p className="text-sm">Tentatives multiples d'accès à la section admin</p>
              <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
            </div>
          </div>
        </Card>

        {/* Activité récente simplifiée */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            Activité récente
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-green-500">•</div>
              <div>
                <p className="text-sm font-medium">Nouvel utilisateur créé</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>Par admin</span>
                  <span className="mx-1">•</span>
                  <span>Il y a 30 minutes</span>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-blue-500">•</div>
              <div>
                <p className="text-sm font-medium">Paramètres système modifiés</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>Par admin</span>
                  <span className="mx-1">•</span>
                  <span>Il y a 2 heures</span>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-purple-500">•</div>
              <div>
                <p className="text-sm font-medium">Nouveau formulaire créé</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>Par admin</span>
                  <span className="mx-1">•</span>
                  <span>Il y a 5 heures</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
