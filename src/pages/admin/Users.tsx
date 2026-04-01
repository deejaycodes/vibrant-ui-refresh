import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { TableSkeleton } from "@/components/Skeletons";
import { getAdminUsers, updateAdminUser } from "@/lib/api";
import { toast } from "sonner";

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

  const fetchUsers = () => {
    setLoading(true);
    getAdminUsers()
      .then((data) => setUsers(data?.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleStatus = async (user: UserRecord) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    try {
      await updateAdminUser(user.id, { status: newStatus });
      toast.success(`${user.name} ${newStatus === "Active" ? "activated" : "deactivated"}`);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Failed to update user");
    }
  };

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
            {loading ? (
              <TableSkeleton columns={7} rows={4} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Organisation</TableHead><TableHead>Status</TableHead><TableHead>Last Active</TableHead><TableHead>Actions</TableHead>
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
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => toggleStatus(u)}>
                          {u.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                      </TableCell>
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

export default AdminUsers;
