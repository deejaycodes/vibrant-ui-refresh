import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { getAuditLog } from "@/lib/api";

interface AuditEntry {
  id: string;
  action: string;
  user: string;
  resource: string;
  details: string;
  timestamp: string;
}

const AdminAudit = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuditLog()
      .then((data) => setEntries(data?.entries || []))
      .catch(() => {
        setEntries([
          { id: "A-001", action: "LOGIN", user: "sarah@womensaid.org", resource: "Auth", details: "Successful login", timestamp: "2025-03-28 14:32:00" },
          { id: "A-002", action: "VIEW", user: "james@refuge.org", resource: "Report R-001", details: "Viewed critical report", timestamp: "2025-03-28 14:28:00" },
          { id: "A-003", action: "UPDATE", user: "sarah@womensaid.org", resource: "Referral REF-101", details: "Status changed to Accepted", timestamp: "2025-03-28 14:15:00" },
          { id: "A-004", action: "CREATE", user: "lisa@mind.org", resource: "Meeting M-001", details: "Scheduled case review", timestamp: "2025-03-28 13:45:00" },
          { id: "A-005", action: "HANDOFF", user: "james@refuge.org", resource: "Case R-003", details: "Handed off to Lisa P.", timestamp: "2025-03-28 12:00:00" },
          { id: "A-006", action: "EXPORT", user: "sarah@womensaid.org", resource: "Reports", details: "Exported monthly report", timestamp: "2025-03-28 11:30:00" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = entries.filter((e) =>
    `${e.action} ${e.user} ${e.resource} ${e.details}`.toLowerCase().includes(search.toLowerCase())
  );

  const actionColor = (action: string) => {
    switch (action) {
      case "CREATE": return "bg-success text-success-foreground border-transparent";
      case "UPDATE": return "bg-info text-info-foreground border-transparent";
      case "DELETE": return "bg-destructive text-destructive-foreground border-transparent";
      default: return "";
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-1">Track all system activity and user actions</p>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search audit log…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead><TableHead>User</TableHead><TableHead>Resource</TableHead><TableHead>Details</TableHead><TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell><Badge variant="secondary" className={actionColor(e.action)}>{e.action}</Badge></TableCell>
                    <TableCell className="text-sm">{e.user}</TableCell>
                    <TableCell className="text-sm font-medium">{e.resource}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.details}</TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">{e.timestamp}</TableCell>
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

export default AdminAudit;
