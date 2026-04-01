import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const STATUS_OPTIONS = ["all", "pending", "accepted", "declined", "completed"];

const Referrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getReferrals()
      .then((data) => setReferrals(data?.referrals || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = statusFilter === "all"
    ? referrals
    : referrals.filter((r) => r.status.toLowerCase() === statusFilter);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Referrals</h1>
            <p className="text-sm text-muted-foreground mt-1">Track and manage case referrals to partner services</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  {filtered.map((r) => (
                    <TableRow
                      key={r.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => navigate(`/dashboard/referrals/detail?id=${r.id}`)}
                    >
                      <TableCell className="font-mono text-xs text-primary">{r.id}</TableCell>
                      <TableCell className="font-mono text-xs">{r.caseId}</TableCell>
                      <TableCell>{r.service}</TableCell>
                      <TableCell><RiskBadge level={r.risk} /></TableCell>
                      <TableCell><Badge variant="secondary" className="capitalize">{r.status}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No referrals found</TableCell>
                    </TableRow>
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

export default Referrals;
