import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";


const Register = () => {
  const [form, setForm] = useState({ orgName: "", contactPerson: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8 space-y-4">
              <CheckCircle className="h-12 w-12 text-success mx-auto" />
              <h2 className="text-xl font-bold text-foreground">Registration Submitted</h2>
              <p className="text-muted-foreground">
                Your organisation registration is pending approval. We'll be in touch shortly.
              </p>
              <Link to="/login">
                <Button variant="outline">Back to Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <QuickExit />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Register Organisation</CardTitle>
            <CardDescription>Join SafeVoice as a partner</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "orgName", label: "Organisation Name", type: "text", placeholder: "e.g. Women's Aid UK" },
                { key: "contactPerson", label: "Contact Person", type: "text", placeholder: "Full name" },
                { key: "email", label: "Email", type: "email", placeholder: "you@organisation.org" },
                { key: "phone", label: "Phone", type: "tel", placeholder: "+44 7700 900000" },
                { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(form as any)[field.key]}
                    onChange={update(field.key)}
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting…" : "Register"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already registered?{" "}
              <Link to="/login" className="text-accent font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
