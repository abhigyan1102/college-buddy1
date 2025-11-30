import { BadgeLevel } from "@/lib/mock-data";
import { CheckCircle2, Medal, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  level: BadgeLevel;
  className?: string;
  showLabel?: boolean;
}

export function UserBadge({ level, className, showLabel = false }: BadgeProps) {
  const config = {
    new: {
      icon: Sprout,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-200",
      label: "New Contributor"
    },
    moderate: {
      icon: CheckCircle2,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "Rising Star"
    },
    expert: {
      icon: Medal,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      label: "Top Expert"
    }
  };

  const { icon: Icon, color, bg, border, label } = config[level];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div 
        className={cn(
          "flex items-center justify-center p-1 rounded-full border", 
          bg, 
          border,
          color
        )}
        title={label}
      >
        <Icon className="w-3 h-3" strokeWidth={2.5} />
      </div>
      {showLabel && <span className={cn("text-xs font-medium", color)}>{label}</span>}
    </div>
  );
}
