import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { getHandoffs } from "@/lib/api";
import { toast } from "sonner";

interface Handoff {
  id: string;
  caseId: string;
  fromWorker: string;
  toWorker: string;
  status: string;
  date: string;
}

const MOCK_WORKERS = ["Sarah K.", "James M.", "Lisa P.", "Dr. Patel", "Anna R."];

const Handoff = () => {
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [toWorker, setToWorker] = useState("");
  const [notes, setNotes] = useState("");

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

  const handleSubmit = () => {
    if (!caseId || !toWorker) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newHandoff: Handoff = {
      id: `H-${String(handoffs.length + 1).padStart(3, "0")}`,
      caseId,
      fromWorker: "You",
      toWorker,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    setHandoffs((prev) => [newHandoff, ...prev]);
    toast.success("Handoff created successfully.");
    setCaseId("");
    setToWorker("");
    setNotes("");
    setOpen(false);
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Case Handoff</h1>
            <p className="text-sm text-muted-foreground mt-1">Transfer cases to human caseworkers</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" />New Handoff</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Case Handoff</DialogTitle>
                <DialogDescription>Transfer a case to another caseworker.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="handoff-case">Case ID *</Label>
                  <Input id="handoff-case" placeholder="e.g. R-001" value={caseId} onChange={(e) => setCaseId(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handoff-to">Assign to *</Label>
                  <Select value={toWorker} onValueChange={setToWorker}>
                    <SelectTrigger id="handoff-to">
                      <SelectValue placeholder="Select caseworker" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_WORKERS.map((w) => (
                        <SelectItem key={w} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handoff-notes">Notes</Label>
                  <Textarea id="handoff-notes" placeholder="Any context for the receiving worker…" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Create Handoff</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
