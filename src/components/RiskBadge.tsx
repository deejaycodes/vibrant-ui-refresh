import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "critical" | "high" | "medium" | "low";
  className?: string;
}

const config = {
  critical: { label: "Critical", className: "bg-[hsl(var(--risk-critical))] text-destructive-foreground border-transparent" },
  high: { label: "High", className: "bg-[hsl(var(--risk-high))] text-warning-foreground border-transparent" },
  medium: { label: "Medium", className: "bg-[hsl(var(--risk-medium))] text-info-foreground border-transparent" },
  low: { label: "Low", className: "bg-[hsl(var(--risk-low))] text-success-foreground border-transparent" },
};

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const c = config[level];
  return <Badge className={cn(c.className, className)}>{c.label}</Badge>;
};

export default RiskBadge;
