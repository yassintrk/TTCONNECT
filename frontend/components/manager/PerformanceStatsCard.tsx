import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceStatsCard() {
  const stats = [
    { label: "Disponibilité réseau", value: "99.8%", change: "+0.2%", positive: true },
    { label: "Temps moyen d'intervention", value: "2h 15min", change: "-10min", positive: true },
    { label: "Taux de résolution", value: "94%", change: "+2%", positive: true },
    { label: "Incidents critiques", value: "3", change: "-1", positive: true },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques de performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                {stat.change} depuis le mois dernier
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
