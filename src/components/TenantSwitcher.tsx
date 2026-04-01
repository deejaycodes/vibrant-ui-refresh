import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setTenant, getTenant } from "@/lib/api";

const tenants = [
  { id: "uk", label: "🇬🇧 UK" },
  { id: "ng", label: "🇳🇬 NG" },
];

const TenantSwitcher = () => {
  const [current, setCurrent] = useState(() => getTenant());

  const handleSwitch = (id: string) => {
    setCurrent(id);
    setTenant(id);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
      {tenants.map((t) => (
        <Button
          key={t.id}
          variant={current === t.id ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleSwitch(t.id)}
          className="text-xs h-7 px-2"
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
};

export default TenantSwitcher;
