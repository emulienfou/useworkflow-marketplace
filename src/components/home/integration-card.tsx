import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface IntegrationCardProps {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  iconColor: string;
  badge?: { label: string; variant: "popular" | "new" };
}

export function IntegrationCard({
  name,
  description,
  category,
  icon: Icon,
  iconColor,
  badge,
}: IntegrationCardProps) {
  return (
    <div className="bg-card border rounded-xl p-6 hover:border-foreground/20 transition-all group flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="size-12 rounded-lg bg-secondary flex items-center justify-center border">
          <Icon className="size-7" style={{ color: iconColor }} />
        </div>
        {badge && (
          <span
            className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
              badge.variant === "popular"
                ? "bg-primary/10 text-primary"
                : "bg-emerald-500/10 text-emerald-500"
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-foreground font-bold text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between border-t">
        <span className="text-xs font-medium text-muted-foreground">
          {category}
        </span>
        <button className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
          Install <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
