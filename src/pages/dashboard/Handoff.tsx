import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, Plus } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { getHandoffs } from "@/lib/api";

interface Handoff {
  id: string;
  caseId: string;
  fromWorker: string;
  toWorker: string;
  status: string;
  date: string;
}

const Handoff = () => {
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHandoffs()
      .then((data) => setHandoffs(data?.handoffs || []))
      .catch(() => {
        setHandoffs([
          { id: "H-001", caseId: "R-001", fromWorker: "Sarah K.", toWorker: "James M.", status: "Pending", date: "2025-03-28" },
          { id: "H-002", caseId: "R-003", fromWorker: "Lisa P.", toWorker: "Sarah K.", status: "Accepted", date: "2025-03-27" },
          { id: "H-003", caseId: "R-005", fromWorker: "James M.", toWorker: "Lisa P.", status: "Completed", date: "2025-03-25" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Case Handoff</h1>
            <p className="text-sm text-muted-foreground mt-1">Transfer cases to human caseworkers</p>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />New Handoff</Button>
        </div>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {handoffs.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell className="font-mono text-xs">{h.id}</TableCell>
                      <TableCell className="font-mono text-xs">{h.caseId}</TableCell>
                      <TableCell>{h.fromWorker}</TableCell>
                      <TableCell>{h.toWorker}</TableCell>
                      <TableCell><Badge variant="secondary">{h.status}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{h.date}</TableCell>
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

export default Handoff;
