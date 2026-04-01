import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Clock, CalendarIcon, Shield } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PortalLayout from "@/components/PortalLayout";
import { TableSkeleton } from "@/components/Skeletons";
import { getMeetings, createMeeting, getSafeWindow, setSafeWindow } from "@/lib/api";
import { toast } from "sonner";

interface Meeting {
  id: string;
  title: string;
  type?: string;
  caseId: string;
  attendees: string | string[];
  dateTime?: string;
  date?: string;
  notes?: string;
  status: string;
}

const MEETING_TYPES = ["case_review", "safety_planning", "marac", "supervision"];

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("case_review");
  const [caseId, setCaseId] = useState("");
  const [attendees, setAttendees] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [creating, setCreating] = useState(false);

  // Safe window state
  const [swDialogOpen, setSwDialogOpen] = useState(false);
  const [swSurvivorId, setSwSurvivorId] = useState("");
  const [safeWindows, setSafeWindows] = useState<{ day: string; startHour: number; endHour: number }[]>([]);
  const [swLoading, setSwLoading] = useState(false);

  const fetchMeetings = () => {
    setLoading(true);
    getMeetings()
      .then((data) => setMeetings(data?.meetings || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMeetings(); }, []);

  const handleCreate = async () => {
    if (!title || !date) {
      toast.error("Title and date are required.");
      return;
    }
    setCreating(true);
    try {
      const attendeeList = attendees.split(",").map((a) => a.trim()).filter(Boolean);
      await createMeeting({
        title,
        type,
        date: `${format(date, "yyyy-MM-dd")} ${time}`,
        attendees: attendeeList,
        notes: notes || undefined,
        caseId: caseId || undefined,
      });
      toast.success("Meeting created");
      setTitle(""); setType("case_review"); setCaseId(""); setAttendees(""); setDate(undefined); setTime("10:00"); setNotes("");
      setOpen(false);
      fetchMeetings();
    } catch (err: any) {
      toast.error(err.message || "Failed to create meeting");
    } finally {
      setCreating(false);
    }
  };

  const handleLoadSafeWindow = async () => {
    if (!swSurvivorId.trim()) { toast.error("Enter a survivor ID"); return; }
    setSwLoading(true);
    try {
      const data = await getSafeWindow(swSurvivorId.trim());
      setSafeWindows(data?.windows || []);
    } catch {
      setSafeWindows([]);
    } finally {
      setSwLoading(false);
    }
  };

  const handleSaveSafeWindow = async () => {
    if (!swSurvivorId.trim()) return;
    try {
      await setSafeWindow(swSurvivorId.trim(), safeWindows);
      toast.success("Safe delivery windows saved");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
  };

  const addWindow = () => {
    setSafeWindows([...safeWindows, { day: "Monday", startHour: 9, endHour: 17 }]);
  };

  const updateWindow = (index: number, field: string, value: any) => {
    setSafeWindows(safeWindows.map((w, i) => i === index ? { ...w, [field]: value } : w));
  };

  const removeWindow = (index: number) => {
    setSafeWindows(safeWindows.filter((_, i) => i !== index));
  };

  const formatAttendees = (a: string | string[]) => Array.isArray(a) ? a.join(", ") : a;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Meetings</h1>
            <p className="text-sm text-muted-foreground mt-1">Schedule and manage case meetings</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Safe window dialog */}
            <Dialog open={swDialogOpen} onOpenChange={setSwDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2"><Shield className="h-4 w-4" />Safe Windows</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Safe Delivery Windows</DialogTitle>
                  <DialogDescription>View and edit safe contact times for a survivor.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="flex gap-2">
                    <Input placeholder="Survivor ID" value={swSurvivorId} onChange={(e) => setSwSurvivorId(e.target.value)} />
                    <Button variant="secondary" onClick={handleLoadSafeWindow} disabled={swLoading}>{swLoading ? "Loading…" : "Load"}</Button>
                  </div>
                  {safeWindows.map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Select value={w.day} onValueChange={(v) => updateWindow(i, "day", v)}>
                        <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="number" min={0} max={23} value={w.startHour} onChange={(e) => updateWindow(i, "startHour", +e.target.value)} className="w-16" />
                      <span className="text-sm text-muted-foreground">to</span>
                      <Input type="number" min={0} max={23} value={w.endHour} onChange={(e) => updateWindow(i, "endHour", +e.target.value)} className="w-16" />
                      <Button variant="ghost" size="sm" onClick={() => removeWindow(i)} className="text-destructive">✕</Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addWindow}>+ Add Window</Button>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSwDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveSafeWindow}>Save Windows</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Create meeting dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2"><Plus className="h-4 w-4" />Schedule Meeting</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Meeting</DialogTitle>
                  <DialogDescription>Create a new case meeting.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input placeholder="e.g. Case Review" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {MEETING_TYPES.map((t) => (
                          <SelectItem key={t} value={t} className="capitalize">{t.replace("_", " ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Case ID</Label>
                    <Input placeholder="e.g. R-001" value={caseId} onChange={(e) => setCaseId(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Attendees (comma-separated)</Label>
                    <Input placeholder="e.g. Sarah K., Dr. Patel" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea placeholder="Meeting agenda or notes…" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={creating}>{creating ? "Creating…" : "Schedule"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="pt-6">
            {loading ? (
              <TableSkeleton columns={6} rows={3} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meeting</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetings.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.title}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs capitalize">{(m.type || "—").replace("_", " ")}</Badge></TableCell>
                      <TableCell className="font-mono text-xs">{m.caseId}</TableCell>
                      <TableCell className="text-sm">{formatAttendees(m.attendees)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{m.dateTime || m.date}</TableCell>
                      <TableCell><Badge variant="secondary">{m.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                  {meetings.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No meetings scheduled</TableCell></TableRow>
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

export default Meetings;
