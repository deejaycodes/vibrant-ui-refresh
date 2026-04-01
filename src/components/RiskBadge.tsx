import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "critical" | "high" | "medium" | "low";
}

const config = {
  critical: { label: "Critical", className: "bg-destructive text-destructive-foreground hover:bg-destructive/80" },
  high: { label: "High", className: "bg-warning text-warning-foreground hover:bg-warning/80" },
  medium: { label: "Medium", className: "bg-accent text-accent-foreground hover:bg-accent/80" },
  low: { label: "Low", className: "bg-secondary text-secondary-foreground hover:bg-secondary/80" },
};

const RiskBadge = ({ level }: RiskBadgeProps) => {
  const { label, className } = config[level];
  return (
    <Badge className={cn(className)}>
      {label}
    </Badge>
  );
};

export default RiskBadge;
