import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import RiskBadge from "@/components/RiskBadge";
import { TableSkeleton } from "@/components/Skeletons";
import { getAdminReviews, updateReview } from "@/lib/api";
import { toast } from "sonner";

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

  const fetchReviews = () => {
    setLoading(true);
    getAdminReviews()
      .then((data) => setReviews(data?.reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    try {
      await updateReview(id, { status: action });
      toast.success(`Review ${action}`);
      fetchReviews();
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Case Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">Human review of AI risk assessments</p>
        </div>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            {loading ? (
              <TableSkeleton columns={8} rows={3} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Review ID</TableHead><TableHead>Case</TableHead><TableHead>AI Risk</TableHead><TableHead>Human Assessment</TableHead><TableHead>Reviewer</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead>
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
                        <Badge variant={r.status === "Reviewed" || r.status === "approved" ? "default" : "secondary"} className={r.status === "Reviewed" || r.status === "approved" ? "bg-success text-success-foreground border-transparent" : ""}>
                          {(r.status === "Reviewed" || r.status === "approved") ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                      <TableCell>
                        {(r.status === "Pending" || r.status === "pending") && (
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" className="gap-1 text-success" onClick={() => handleAction(r.id, "approved")}>
                              <ThumbsUp className="h-3 w-3" />Approve
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1 text-destructive" onClick={() => handleAction(r.id, "rejected")}>
                              <ThumbsDown className="h-3 w-3" />Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {reviews.length === 0 && (
                    <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No reviews</TableCell></TableRow>
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

export default AdminReviews;
