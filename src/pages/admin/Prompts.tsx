import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { getAdminPrompts, updatePrompt } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
}

const AdminPrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    getAdminPrompts()
      .then((data) => setPrompts(data?.prompts || []))
      .catch(() => {
        setPrompts([
          { id: "P-001", name: "Safety Assessment", description: "Initial risk assessment prompt", content: "You are a safety assessment AI. Evaluate the following situation and provide a risk level (critical/high/medium/low) with recommendations...", category: "Assessment" },
          { id: "P-002", name: "Safety Plan", description: "Safety planning guidance", content: "Help create a personalised safety plan. Consider: safe places, emergency contacts, important documents, escape routes...", category: "Planning" },
          { id: "P-003", name: "Service Matching", description: "Match survivors to local services", content: "Based on the survivor's location and needs, recommend appropriate local support services from our directory...", category: "Referral" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (prompt: Prompt) => {
    try {
      await updatePrompt(prompt.id, { content: prompt.content });
      toast({ title: "Prompt saved" });
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Prompts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage AI system prompts and templates</p>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          prompts.map((p) => (
            <Card key={p.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-medium">{p.name}</CardTitle>
                    <CardDescription>{p.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{p.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={p.content}
                  onChange={(e) => setPrompts(prompts.map((x) => x.id === p.id ? { ...x, content: e.target.value } : x))}
                  rows={4}
                  className="font-mono text-xs"
                />
                <Button size="sm" onClick={() => handleSave(p)} className="gap-2">
                  <Save className="h-3.5 w-3.5" />Save
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
};

export default AdminPrompts;
