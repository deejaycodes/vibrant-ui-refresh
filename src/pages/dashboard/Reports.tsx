import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PortalLayout from "@/components/PortalLayout";
import RiskBadge from "@/components/RiskBadge";
import { TableSkeleton } from "@/components/Skeletons";
import { getReports } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  survivor: string;
  risk: "critical" | "high" | "medium" | "low";
  status: string;
  type: string;
  date: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then((data) => setReports(data?.reports || []))
      .catch(() => {
        setReports([
          { id: "R-001", survivor: "Anonymous", risk: "critical", status: "Open", type: "Safety Concern", date: "2025-03-28" },
          { id: "R-002", survivor: "Anonymous", risk: "high", status: "In Progress", type: "Risk Assessment", date: "2025-03-27" },
          { id: "R-003", survivor: "Anonymous", risk: "medium", status: "Referred", type: "Welfare Check", date: "2025-03-26" },
          { id: "R-004", survivor: "Anonymous", risk: "low", status: "Resolved", type: "Follow-up", date: "2025-03-25" },
          { id: "R-005", survivor: "Anonymous", risk: "high", status: "Open", type: "Safety Concern", date: "2025-03-24" },
          { id: "R-006", survivor: "Anonymous", risk: "critical", status: "In Progress", type: "Multi-agency", date: "2025-03-23" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage case reports</p>
        </div>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            {loading ? (
              <TableSkeleton columns={6} rows={6} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Survivor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell>{r.survivor}</TableCell>
                      <TableCell className="text-sm">{r.type}</TableCell>
                      <TableCell><RiskBadge level={r.risk} /></TableCell>
                      <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
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

export default Reports;
