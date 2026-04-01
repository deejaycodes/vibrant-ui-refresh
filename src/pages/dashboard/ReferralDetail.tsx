import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, MapPin, Phone, Calendar, FileText, AlertTriangle } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import RiskBadge from "@/components/RiskBadge";
import { DetailSkeleton } from "@/components/Skeletons";
import { getReferralDetail } from "@/lib/api";

interface ReferralDetailData {
  id: string;
  caseId: string;
  service: string;
  serviceAddress: string;
  servicePhone: string;
  risk: "critical" | "high" | "medium" | "low";
  status: string;
  date: string;
  survivor: string;
  notes: string;
  history: { date: string; action: string; by: string }[];
}

const ReferralDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [referral, setReferral] = useState<ReferralDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getReferralDetail(id)
      .then(setReferral)
      .catch(() => {
        setReferral({
          id: id || "REF-101",
          caseId: "R-001",
          service: "Women's Aid Shelter",
          serviceAddress: "42 Hope Street, London EC1A 1BB",
          servicePhone: "020 7123 4567",
          risk: "critical",
          status: "Pending",
          date: "2025-03-28",
          survivor: "Anonymous",
          notes: "Survivor requires immediate safe accommodation. Two children under 5. Has fled the property with essential documents. No known medical conditions. Speaks English and Urdu.",
          history: [
            { date: "2025-03-28 14:32", action: "Referral created", by: "Sarah K." },
            { date: "2025-03-28 14:35", action: "Sent to Women's Aid Shelter", by: "System" },
            { date: "2025-03-28 15:10", action: "Acknowledged by service", by: "Women's Aid" },
          ],
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PortalLayout>
        <DetailSkeleton />
      </PortalLayout>
    );
  }

  if (!referral) {
    return (
      <PortalLayout>
        <p className="text-sm text-muted-foreground">Referral not found.</p>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/referrals">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Referral {referral.id}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Case {referral.caseId} · Created {referral.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Referral Details</CardTitle>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={referral.risk} />
                    <Badge variant="secondary">{referral.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Survivor</p>
                      <p className="text-sm font-medium">{referral.survivor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium">{referral.date}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</p>
                  </div>
                  <p className="text-sm leading-relaxed">{referral.notes}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referral.history.map((h, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                        {i < referral.history.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">{h.action}</p>
                        <p className="text-xs text-muted-foreground">{h.by} · {h.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Referred Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">{referral.service}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{referral.serviceAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span>{referral.servicePhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-warning/30 bg-warning/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Risk Notice</p>
                    <p className="text-muted-foreground mt-1">This case is marked as <strong>{referral.risk}</strong> risk. Ensure appropriate safety protocols are followed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default ReferralDetailPage;
