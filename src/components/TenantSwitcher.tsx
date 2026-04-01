import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const tenants = [
  { id: "uk", label: "🇬🇧 UK" },
  { id: "ng", label: "🇳🇬 Nigeria" },
];

const TenantSwitcher = () => {
  const [current, setCurrent] = useState(() => {
    return localStorage.getItem("safevoice_tenant") || "uk";
  });

  useEffect(() => {
    localStorage.setItem("safevoice_tenant", current);
  }, [current]);

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-muted-foreground" />
      {tenants.map((t) => (
        <Button
          key={t.id}
          variant={current === t.id ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrent(t.id)}
          className="text-xs h-7 px-2"
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
};

export default TenantSwitcher;
