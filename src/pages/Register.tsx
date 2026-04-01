import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Shield } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm shadow-sm text-center">
          <CardContent className="p-8 space-y-4">
            <CheckCircle className="h-12 w-12 text-success mx-auto" />
            <h2 className="text-xl font-semibold">Registration Submitted</h2>
            <p className="text-sm text-muted-foreground">Your organisation is pending approval. We'll be in touch shortly.</p>
            <Link to="/"><Button variant="outline">Back to Login</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl font-semibold">Register Organisation</CardTitle>
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
                <Input id={field.key} type={field.type} placeholder={field.placeholder} value={(form as any)[field.key]} onChange={update(field.key)} required />
              </div>
            ))}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting…" : "Register"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
