import { useEffect, useState } from "react";
import { FileText, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PortalLayout from "@/components/PortalLayout";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import { getDashboard, getReports, getReferrals } from "@/lib/api";

interface DashboardData {
  totalCases: number;
  activeReferrals: number;
  criticalReports: number;
  resolved: number;
}

interface Report {
  id: string;
  survivor: string;
  risk: "critical" | "high" | "medium" | "low";
  status: string;
  date: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboard(), getReports(), getReferrals()])
      .then(([dash, reps]) => {
        setStats(dash);
        setReports(reps?.reports || []);
      })
      .catch(() => {
        // Use mock data for demo
        setStats({ totalCases: 247, activeReferrals: 34, criticalReports: 8, resolved: 189 });
        setReports([
          { id: "R-001", survivor: "Anonymous", risk: "critical", status: "Open", date: "2025-03-28" },
          { id: "R-002", survivor: "Anonymous", risk: "high", status: "In Progress", date: "2025-03-27" },
          { id: "R-003", survivor: "Anonymous", risk: "medium", status: "Referred", date: "2025-03-26" },
          { id: "R-004", survivor: "Anonymous", risk: "low", status: "Resolved", date: "2025-03-25" },
          { id: "R-005", survivor: "Anonymous", risk: "high", status: "Open", date: "2025-03-24" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Cases" value={stats?.totalCases ?? "—"} icon={FileText} />
          <StatCard title="Active Referrals" value={stats?.activeReferrals ?? "—"} icon={Users} />
          <StatCard title="Critical Reports" value={stats?.criticalReports ?? "—"} icon={AlertTriangle} />
          <StatCard title="Resolved" value={stats?.resolved ?? "—"} icon={CheckCircle2} />
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-sm">Loading…</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Survivor</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-sm">{r.id}</TableCell>
                      <TableCell>{r.survivor}</TableCell>
                      <TableCell><RiskBadge level={r.risk} /></TableCell>
                      <TableCell>{r.status}</TableCell>
                      <TableCell className="text-muted-foreground">{r.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
