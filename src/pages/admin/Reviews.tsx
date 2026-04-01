import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import RiskBadge from "@/components/RiskBadge";
import { getAdminReviews } from "@/lib/api";

interface Review {
  id: string;
  caseId: string;
  aiRisk: "critical" | "high" | "medium" | "low";
  humanRisk: string;
  reviewer: string;
  status: string;
  date: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminReviews()
      .then((data) => setReviews(data?.reviews || []))
      .catch(() => {
        setReviews([
          { id: "RV-001", caseId: "R-001", aiRisk: "critical", humanRisk: "Agreed", reviewer: "Dr. Patel", status: "Reviewed", date: "2025-03-28" },
          { id: "RV-002", caseId: "R-002", aiRisk: "high", humanRisk: "Downgraded to Medium", reviewer: "Sarah K.", status: "Reviewed", date: "2025-03-27" },
          { id: "RV-003", caseId: "R-005", aiRisk: "high", humanRisk: "Pending", reviewer: "—", status: "Pending", date: "2025-03-24" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Case Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">Human review of AI risk assessments</p>
        </div>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Review ID</TableHead><TableHead>Case</TableHead><TableHead>AI Risk</TableHead><TableHead>Human Assessment</TableHead><TableHead>Reviewer</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-mono text-xs">{r.caseId}</TableCell>
                    <TableCell><RiskBadge level={r.aiRisk} /></TableCell>
                    <TableCell className="text-sm">{r.humanRisk}</TableCell>
                    <TableCell className="text-sm">{r.reviewer}</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Reviewed" ? "default" : "secondary"} className={r.status === "Reviewed" ? "bg-success text-success-foreground border-transparent" : ""}>
                        {r.status === "Reviewed" ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default AdminReviews;
