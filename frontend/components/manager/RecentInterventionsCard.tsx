import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentInterventionsCard() {
  const interventions = [
    {
      id: 1,
      title: "Maintenance préventive trimestrielle",
      site: "Site Tunis Centre",
      status: "completed",
      date: "15/05/2025",
      technician: "Ahmed Benali",
    },
    {
      id: 2,
      title: "Remplacement batterie de secours",
      site: "Site Sousse Plage",
      status: "in_progress",
      date: "17/05/2025",
      technician: "Mohamed Trabelsi",
    },
    {
      id: 3,
      title: "Vérification système de refroidissement",
      site: "Site Sfax Industriel",
      status: "pending",
      date: "20/05/2025",
      technician: "Fatima Zahra",
    },
    {
      id: 4,
      title: "Panne d'alimentation électrique",
      site: "Site Bizerte Port",
      status: "pending",
      date: "Immédiat",
      technician: "Non assigné",
    },
  ]

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "in_progress":
        return "En cours"
      case "completed":
        return "Terminée"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interventions récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interventions.map((intervention) => (
            <div
              key={intervention.id}
              className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <h3 className="font-medium">{intervention.title}</h3>
                <p className="text-sm text-gray-500">{intervention.site}</p>
                <div className="flex items-center mt-1">
                  <Badge className={getStatusBadgeClass(intervention.status)}>
                    {getStatusLabel(intervention.status)}
                  </Badge>
                  <span className="text-xs text-gray-500 ml-2">{intervention.date}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">{intervention.technician}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
