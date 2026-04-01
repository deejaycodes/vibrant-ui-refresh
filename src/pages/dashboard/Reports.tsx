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
  type?: string;
  abuseTypes?: string[];
  date: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then((data) => setReports(data?.reports || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage AI-generated risk reports</p>
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
                    <TableHead>Risk</TableHead>
                    <TableHead>Abuse Types</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((r) => (
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
                            <span className="text-xs text-muted-foreground">{r.type || "—"}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                    </TableRow>
                  ))}
                  {reports.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No reports found</TableCell></TableRow>
                  )}
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
