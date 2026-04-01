import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, MapPin, Phone, Calendar, FileText, AlertTriangle, Send, Clock } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import RiskBadge from "@/components/RiskBadge";
import { DetailSkeleton } from "@/components/Skeletons";
import { getReferralDetail, updateReferral, getCaseNotes, addCaseNote } from "@/lib/api";
import { toast } from "sonner";

interface ReferralData {
  id: string;
  caseId: string;
  service: string;
  serviceAddress?: string;
  servicePhone?: string;
  serviceType?: string;
  risk: "critical" | "high" | "medium" | "low";
  status: string;
  date: string;
  survivor: string;
  notes?: string;
  abuseTypes?: string[];
  safetyPlan?: string;
  immediateRisk?: boolean;
  history?: { date: string; action: string; by: string }[];
  reportDate?: string;
  referralDate?: string;
  outcome?: string;
}

interface CaseNote {
  id: string;
  author: string;
  content: string;
  type: string;
  timestamp: string;
}

const NOTE_TYPES = ["note", "action", "update", "phone_call", "visit"];

const ReferralDetailPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [referral, setReferral] = useState<ReferralData | null>(null);
  const [notes, setNotes] = useState<CaseNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState("note");

  const fetchData = () => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getReferralDetail(id).catch(() => null),
      getCaseNotes(id).catch(() => null),
    ])
      .then(([ref, notesData]) => {
        setReferral(ref);
        setNotes(notesData?.notes || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleStatusAction = async (newStatus: string) => {
    if (!id) return;
    setActionLoading(true);
    try {
      await updateReferral(id, newStatus);
      toast.success(`Referral ${newStatus}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!id || !noteContent.trim()) return;
    try {
      await addCaseNote(id, "", "You", noteContent.trim(), noteType);
      toast.success("Note added");
      setNoteContent("");
      setNoteType("note");
      // Refresh notes
      getCaseNotes(id).then((d) => setNotes(d?.notes || [])).catch(() => {});
    } catch (err: any) {
      toast.error(err.message || "Failed to add note");
    }
  };

  if (!id) {
    return (
      <PortalLayout>
        <p className="text-sm text-muted-foreground">No referral ID provided.</p>
      </PortalLayout>
    );
  }

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
        <div className="space-y-4">
          <Link to="/dashboard/referrals">
            <Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="h-4 w-4" />Back</Button>
          </Link>
          <p className="text-sm text-muted-foreground">Referral not found.</p>
        </div>
      </PortalLayout>
    );
  }

  const status = referral.status?.toLowerCase();

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard/referrals">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">Referral {referral.id}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Case {referral.caseId} · Created {referral.date}</p>
          </div>
          {/* Status actions */}
          <div className="flex items-center gap-2">
            {status === "pending" && (
              <>
                <Button onClick={() => handleStatusAction("active")} disabled={actionLoading} className="gap-1">Accept Referral</Button>
                <Button onClick={() => handleStatusAction("rejected")} disabled={actionLoading} variant="outline" className="gap-1 text-destructive">Decline</Button>
              </>
            )}
            {status === "active" && (
              <Button onClick={() => handleStatusAction("resolved")} disabled={actionLoading}>Mark Resolved</Button>
            )}
          </div>
        </div>

        {/* Immediate risk warning */}
        {referral.immediateRisk && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Immediate Risk</p>
                <p className="text-xs text-muted-foreground">This case has been flagged as having immediate safety concerns.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case details */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Case Details</CardTitle>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={referral.risk} />
                    <Badge variant="secondary" className="capitalize">{referral.status}</Badge>
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

                {/* Abuse types */}
                {referral.abuseTypes && referral.abuseTypes.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Abuse Types</p>
                      <div className="flex flex-wrap gap-1.5">
                        {referral.abuseTypes.map((type, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{type}</Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Notes */}
                {referral.notes && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</p>
                      </div>
                      <p className="text-sm leading-relaxed">{referral.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Safety plan */}
            {referral.safetyPlan && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">AI Safety Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{referral.safetyPlan}</p>
                </CardContent>
              </Card>
            )}

            {/* Activity timeline */}
            {referral.history && referral.history.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {referral.history.map((h, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                          {i < (referral.history?.length ?? 0) - 1 && <div className="w-px flex-1 bg-border mt-1" />}
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
            )}

            {/* Case notes */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Case Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add note form */}
                <div className="space-y-3 p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Select value={noteType} onValueChange={setNoteType}>
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NOTE_TYPES.map((t) => (
                          <SelectItem key={t} value={t} className="capitalize">{t.replace("_", " ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Add a case note…"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={3}
                  />
                  <Button size="sm" onClick={handleAddNote} disabled={!noteContent.trim()} className="gap-2">
                    <Send className="h-3.5 w-3.5" />Add Note
                  </Button>
                </div>

                <Separator />

                {/* Notes list */}
                {notes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No case notes yet</p>
                ) : (
                  <div className="space-y-3">
                    {notes.map((n) => (
                      <div key={n.id} className="p-3 rounded-lg border space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{n.author}</span>
                            <Badge variant="outline" className="text-xs capitalize">{n.type.replace("_", " ")}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />{n.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{n.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service info */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Referred Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">{referral.service}</p>
                {referral.serviceType && (
                  <Badge variant="secondary" className="text-xs">{referral.serviceType}</Badge>
                )}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {referral.serviceAddress && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{referral.serviceAddress}</span>
                    </div>
                  )}
                  {referral.servicePhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{referral.servicePhone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Timeline sidebar */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Report date</span>
                  <span className="font-medium">{referral.reportDate || referral.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Referral date</span>
                  <span className="font-medium">{referral.referralDate || referral.date}</span>
                </div>
                {referral.outcome && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outcome</span>
                    <span className="font-medium capitalize">{referral.outcome}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Risk notice */}
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
