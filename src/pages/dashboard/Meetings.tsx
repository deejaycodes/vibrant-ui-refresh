import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Clock, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PortalLayout from "@/components/PortalLayout";
import { getMeetings } from "@/lib/api";
import { toast } from "sonner";

interface Meeting {
  id: string;
  title: string;
  caseId: string;
  attendees: string;
  dateTime: string;
  status: string;
}

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [caseId, setCaseId] = useState("");
  const [attendees, setAttendees] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");

  useEffect(() => {
    getMeetings()
      .then((data) => setMeetings(data?.meetings || []))
      .catch(() => {
        setMeetings([
          { id: "M-001", title: "Case Review — R-001", caseId: "R-001", attendees: "Sarah K., Dr. Patel", dateTime: "2025-03-29 10:00", status: "Scheduled" },
          { id: "M-002", title: "Safety Plan Update", caseId: "R-003", attendees: "Lisa P., Legal team", dateTime: "2025-03-30 14:00", status: "Scheduled" },
          { id: "M-003", title: "Multi-agency Conference", caseId: "R-002", attendees: "James M., Police, Social Services", dateTime: "2025-03-28 09:00", status: "Completed" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = () => {
    if (!title || !date) {
      toast.error("Please provide a title and date.");
      return;
    }
    const newMeeting: Meeting = {
      id: `M-${String(meetings.length + 1).padStart(3, "0")}`,
      title,
      caseId: caseId || "—",
      attendees: attendees || "—",
      dateTime: `${format(date, "yyyy-MM-dd")} ${time}`,
      status: "Scheduled",
    };
    setMeetings((prev) => [newMeeting, ...prev]);
    toast.success("Meeting scheduled successfully.");
    setTitle("");
    setCaseId("");
    setAttendees("");
    setDate(undefined);
    setTime("10:00");
    setOpen(false);
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Meetings</h1>
            <p className="text-sm text-muted-foreground mt-1">Schedule and manage case meetings</p>
          </div>
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
                  <Label htmlFor="meeting-title">Title *</Label>
                  <Input id="meeting-title" placeholder="e.g. Case Review" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-case">Case ID</Label>
                  <Input id="meeting-case" placeholder="e.g. R-001" value={caseId} onChange={(e) => setCaseId(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-attendees">Attendees</Label>
                  <Input id="meeting-attendees" placeholder="e.g. Sarah K., Dr. Patel" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meeting-time">Time</Label>
                    <Input id="meeting-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Schedule</Button>
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
                    <TableHead>Meeting</TableHead>
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
                      <TableCell className="font-mono text-xs">{m.caseId}</TableCell>
                      <TableCell className="text-sm">{m.attendees}</TableCell>
                      <TableCell className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{m.dateTime}</TableCell>
                      <TableCell><Badge variant="secondary">{m.status}</Badge></TableCell>
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

export default Meetings;
