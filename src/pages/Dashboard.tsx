import { useEffect, useState } from "react";
import { FileText, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PortalLayout from "@/components/PortalLayout";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import { StatCardSkeleton, TableSkeleton } from "@/components/Skeletons";
import { getDashboard, getReports } from "@/lib/api";

interface Report {
  id: string;
  survivor: string;
  risk: "critical" | "high" | "medium" | "low";
  status: string;
  abuseTypes?: string[];
  date: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboard(), getReports()])
      .then(([dash, reps]) => { setStats(dash); setReports(reps?.reports || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Compute breakdowns from reports
  const riskCounts = reports.reduce((acc, r) => {
    const level = r.risk || "low";
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusCounts = reports.reduce((acc, r) => {
    const s = (r.status || "unknown").toLowerCase();
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const riskColors: Record<string, string> = {
    critical: "bg-destructive text-destructive-foreground",
    high: "bg-warning text-warning-foreground",
    medium: "bg-info text-info-foreground",
    low: "bg-success text-success-foreground",
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of cases and referrals</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard title="Total Cases" value={stats?.totalCases ?? "—"} icon={FileText} />
              <StatCard title="Active Referrals" value={stats?.activeReferrals ?? "—"} icon={Users} />
              <StatCard title="Critical Reports" value={stats?.criticalReports ?? "—"} icon={AlertTriangle} />
              <StatCard title="Resolved" value={stats?.resolved ?? "—"} icon={CheckCircle2} />
            </>
          )}
        </div>

        {/* Breakdowns */}
        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reports by risk level */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Reports by Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(["critical", "high", "medium", "low"] as const).map((level) => (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`${riskColors[level]} border-transparent text-xs capitalize`}>{level}</Badge>
                      </div>
                      <span className="text-sm font-semibold">{riskCounts[level] || 0}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referrals by status */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Referrals by Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["pending", "accepted", "declined", "completed"].map((s) => (
                    <div key={s} className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize text-xs">{s}</Badge>
                      <span className="text-sm font-semibold">{statusCounts[s] || 0}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent reports table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton columns={5} rows={5} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Survivor</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Abuse Types</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.slice(0, 5).map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell>{r.survivor}</TableCell>
                      <TableCell><RiskBadge level={r.risk} /></TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(r.abuseTypes || []).map((t, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{t}</Badge>
                          ))}
                          {(!r.abuseTypes || r.abuseTypes.length === 0) && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
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
