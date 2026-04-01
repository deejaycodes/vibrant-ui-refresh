import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PortalLayout from "@/components/PortalLayout";
import RiskBadge from "@/components/RiskBadge";
import { TableSkeleton } from "@/components/Skeletons";
import { getReferrals } from "@/lib/api";

interface Referral {
  id: string;
  caseId: string;
  service: string;
  risk: "critical" | "high" | "medium" | "low";
  status: string;
  date: string;
}

const Referrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferrals()
      .then((data) => setReferrals(data?.referrals || []))
      .catch(() => {
        setReferrals([
          { id: "REF-101", caseId: "R-001", service: "Women's Aid Shelter", risk: "critical", status: "Pending", date: "2025-03-28" },
          { id: "REF-102", caseId: "R-002", service: "Legal Aid Society", risk: "high", status: "Accepted", date: "2025-03-27" },
          { id: "REF-103", caseId: "R-003", service: "Counselling Service", risk: "medium", status: "In Progress", date: "2025-03-26" },
          { id: "REF-104", caseId: "R-004", service: "Housing Support", risk: "low", status: "Completed", date: "2025-03-25" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Referrals</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage case referrals to partner services</p>
        </div>
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">All Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton columns={6} rows={4} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referral ID</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Link to={`/dashboard/referrals/${r.id}`} className="font-mono text-xs text-primary hover:underline">{r.id}</Link>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{r.caseId}</TableCell>
                      <TableCell>{r.service}</TableCell>
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

export default Referrals;
