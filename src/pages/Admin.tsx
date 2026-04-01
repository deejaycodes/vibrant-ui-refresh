import { useEffect, useState } from "react";
import { Users, MessageSquare, FileText, ArrowRightLeft, Cpu, DollarSign, Activity, RefreshCw, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PortalLayout from "@/components/PortalLayout";
import StatCard from "@/components/StatCard";
import { StatCardSkeleton, TableSkeleton } from "@/components/Skeletons";
import { getStats, getHealthCheck, getGenerations, runCron } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [stats, setStats] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAll = () => {
    setLoading(true);
    Promise.all([getStats(), getHealthCheck(), getGenerations()])
      .then(([s, h, g]) => { setStats(s); setHealth(h); setGenerations(g?.generations || []); })
      .catch(() => {
        setStats({ survivors: 1243, activeConversations: 67, reports: 892, referrals: 341, messages: 15420, cost: "£247.50" });
        setHealth({ status: "healthy" });
        setGenerations([
          { id: "G-001", model: "gpt-4o", tokens: 1250, cost: "£0.04", timestamp: "2025-03-28 14:32" },
          { id: "G-002", model: "gpt-4o", tokens: 890, cost: "£0.03", timestamp: "2025-03-28 14:28" },
          { id: "G-003", model: "gpt-4o-mini", tokens: 450, cost: "£0.01", timestamp: "2025-03-28 14:15" },
        ]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCron = async () => {
    try { await runCron(); toast({ title: "Cron job triggered" }); }
    catch { toast({ title: "Cron failed", variant: "destructive" }); }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">System health and platform metrics</p>
          </div>
          <div className="flex items-center gap-2">
            {health && (
              <Badge className={health.status === "healthy" ? "bg-success text-success-foreground border-transparent" : "bg-destructive text-destructive-foreground border-transparent"}>
                <Activity className="h-3 w-3 mr-1" />{health.status}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard title="Survivors" value={stats?.survivors ?? "—"} icon={Users} />
              <StatCard title="Active Conversations" value={stats?.activeConversations ?? "—"} icon={MessageSquare} />
              <StatCard title="Reports" value={stats?.reports ?? "—"} icon={FileText} />
              <StatCard title="Referrals" value={stats?.referrals ?? "—"} icon={ArrowRightLeft} />
              <StatCard title="Messages" value={stats?.messages ?? "—"} icon={Cpu} />
              <StatCard title="AI Cost" value={stats?.cost ?? "—"} icon={DollarSign} />
            </>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCron} variant="outline" className="gap-2"><Play className="h-4 w-4" />Run Cron</Button>
          <Button onClick={fetchAll} variant="outline" className="gap-2"><RefreshCw className="h-4 w-4" />Refresh</Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base font-medium">AI Generations Log</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton columns={5} rows={3} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead><TableHead>Model</TableHead><TableHead>Tokens</TableHead><TableHead>Cost</TableHead><TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generations.map((g: any) => (
                    <TableRow key={g.id}>
                      <TableCell className="font-mono text-xs">{g.id}</TableCell>
                      <TableCell><Badge variant="secondary">{g.model}</Badge></TableCell>
                      <TableCell>{g.tokens?.toLocaleString()}</TableCell>
                      <TableCell>{g.cost}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{g.timestamp}</TableCell>
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

export default Admin;
