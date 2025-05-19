import { DashboardCard } from "@/components/manager/DashboardCard"
import { RecentInterventionsCard } from "@/components/manager/RecentInterventionsCard"
import { PerformanceStatsCard } from "@/components/manager/PerformanceStatsCard"
import { SiteMapCard } from "@/components/manager/SiteMapCard"

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue, Nidhal. Voici un aperçu de vos activités.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Sites GSM" value="124" change="+3" changeType="increase" icon="antenna" />
        <DashboardCard title="Interventions" value="28" change="+12" changeType="increase" icon="tool" />
        <DashboardCard title="Interventions en attente" value="7" change="-2" changeType="decrease" icon="clock" />
        <DashboardCard title="Rapports" value="15" change="+5" changeType="increase" icon="file-text" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentInterventionsCard />
        <PerformanceStatsCard />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SiteMapCard />
      </div>
    </div>
  )
}
