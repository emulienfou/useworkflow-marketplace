"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  { icon: "grid_view", label: "All Plugins", value: "all" },
  { icon: "psychology", label: "AI & LLMs", value: "ai" },
  { icon: "database", label: "Vector DBs", value: "vector-db" },
  { icon: "hub", label: "CRM & Sales", value: "crm" },
  { icon: "share", label: "Social", value: "social" },
  { icon: "terminal", label: "Dev Tools", value: "dev-tools" },
];

const pricingFilters = ["Free", "Paid", "Open Source"];

export function SidebarFilters() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <aside className="w-full md:w-64 flex flex-col gap-10 shrink-0">
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-3">
          Explore
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
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
                  {cat.icon}
                </span>
                <span className="text-sm">{cat.label}</span>
              </button>
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
