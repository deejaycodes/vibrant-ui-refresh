import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { getMeetings } from "@/lib/api";

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

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Meetings</h1>
            <p className="text-sm text-muted-foreground mt-1">Schedule and manage case meetings</p>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />Schedule Meeting</Button>
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
