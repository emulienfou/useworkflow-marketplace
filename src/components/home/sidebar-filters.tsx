"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const pricingFilters = ["Free", "Paid", "Open Source"];

const categoryIcons: Record<string, string> = {
  all: "grid_view",
};

const categoryLabels: Record<string, string> = {
  all: "All Plugins",
};

interface SidebarFiltersProps {
  categories: string[];
}

function capitalize(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export function SidebarFilters({ categories }: SidebarFiltersProps) {
  const pathname = usePathname();
  const activeCategory = pathname === "/" ? "all" : pathname.slice(1);

  const allCategories = ["all", ...categories];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-10 shrink-0">
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-3">
          Explore
        </h3>
        <div className="flex flex-col gap-1">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const href = cat === "all" ? "/" : `/${cat}`;

            return (
              <Link
                key={cat}
                href={href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2 rounded-md group transition-all",
                  isActive
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "material-symbols-outlined text-lg transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {categoryIcons[cat] || 'folder'}
                </span>
                <span className="text-sm">{categoryLabels[cat] || capitalize(cat)}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-3">
          Type
        </h3>
        <div className="flex flex-col gap-3 pl-3">
          {pricingFilters.map((filter) => (
            <label
              key={filter}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox className="rounded-sm" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {filter}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
