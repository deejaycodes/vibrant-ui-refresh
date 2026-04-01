import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { getAdminUsers } from "@/lib/api";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  org: string;
  status: string;
  lastActive: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers()
      .then((data) => setUsers(data?.users || []))
      .catch(() => {
        setUsers([
          { id: "U-001", name: "Sarah K.", email: "sarah@womensaid.org", role: "Caseworker", org: "Women's Aid", status: "Active", lastActive: "2025-03-28" },
          { id: "U-002", name: "James M.", email: "james@refuge.org", role: "Manager", org: "Refuge", status: "Active", lastActive: "2025-03-28" },
          { id: "U-003", name: "Lisa P.", email: "lisa@mind.org", role: "Caseworker", org: "MIND", status: "Active", lastActive: "2025-03-27" },
          { id: "U-004", name: "Dr. Patel", email: "patel@nhs.uk", role: "Reviewer", org: "NHS Trust", status: "Inactive", lastActive: "2025-03-20" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage partner accounts and permissions</p>
          </div>
          <Button className="gap-2"><UserPlus className="h-4 w-4" />Add User</Button>
        </div>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Organisation</TableHead><TableHead>Status</TableHead><TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-sm">{u.email}</TableCell>
                    <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                    <TableCell className="text-sm">{u.org}</TableCell>
                    <TableCell><Badge variant={u.status === "Active" ? "default" : "secondary"} className={u.status === "Active" ? "bg-success text-success-foreground border-transparent" : ""}>{u.status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.lastActive}</TableCell>
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

export default AdminUsers;
