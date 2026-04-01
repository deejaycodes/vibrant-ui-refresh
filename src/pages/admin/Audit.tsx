import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PortalLayout from "@/components/PortalLayout";
import { TableSkeleton } from "@/components/Skeletons";
import { getAuditLog } from "@/lib/api";

interface AuditEntry {
  id: string;
  action: string;
  user: string;
  resource: string;
  details: string;
  timestamp: string;
}

const ACTION_TYPES = ["all", "LOGIN", "VIEW", "CREATE", "UPDATE", "DELETE", "HANDOFF", "EXPORT"];

const AdminAudit = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [loading, setLoading] = useState(true);

  const fetchAudit = () => {
    setLoading(true);
    getAuditLog({
      search: search || undefined,
      action: actionFilter !== "all" ? actionFilter : undefined,
      user: userFilter || undefined,
      from: fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
      to: toDate ? format(toDate, "yyyy-MM-dd") : undefined,
    })
      .then((data) => setEntries(data?.entries || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAudit(); }, []);

  // Client-side filtering as fallback
  const filtered = entries.filter((e) => {
    const matchSearch = !search || `${e.action} ${e.user} ${e.resource} ${e.details}`.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || e.action === actionFilter;
    const matchUser = !userFilter || e.user.toLowerCase().includes(userFilter.toLowerCase());
    return matchSearch && matchAction && matchUser;
  });

  const actionColor = (action: string) => {
    switch (action) {
      case "CREATE": return "bg-success text-success-foreground border-transparent";
      case "UPDATE": return "bg-info text-info-foreground border-transparent";
      case "DELETE": return "bg-destructive text-destructive-foreground border-transparent";
      default: return "";
    }
  };

  const clearFilters = () => {
    setSearch(""); setActionFilter("all"); setUserFilter(""); setFromDate(undefined); setToDate(undefined);
  };

  const hasFilters = search || actionFilter !== "all" || userFilter || fromDate || toDate;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-1">Track all system activity and user actions</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Action type" /></SelectTrigger>
            <SelectContent>
              {ACTION_TYPES.map((a) => (
                <SelectItem key={a} value={a}>{a === "all" ? "All actions" : a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Filter by user" value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="w-48" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-36 justify-start text-left font-normal text-xs", !fromDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                {fromDate ? format(fromDate, "MMM dd") : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-36 justify-start text-left font-normal text-xs", !toDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                {toDate ? format(toDate, "MMM dd") : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          <Button variant="secondary" size="sm" onClick={fetchAudit}>Apply</Button>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1"><X className="h-3.5 w-3.5" />Clear</Button>
          )}
        </div>

        <Card className="shadow-sm">
          <CardContent className="pt-6">
            {loading ? (
              <TableSkeleton columns={5} rows={6} />
            ) : (
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
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No entries found</TableCell></TableRow>
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

export default AdminAudit;
