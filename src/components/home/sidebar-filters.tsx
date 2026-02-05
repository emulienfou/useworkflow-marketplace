"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Brain,
  Database,
  Network,
  Share2,
  Terminal,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const categories = [
  { icon: LayoutGrid, label: "All Integrations", value: "all" },
  { icon: Brain, label: "AI & LLMs", value: "ai" },
  { icon: Database, label: "Vector Databases", value: "vector-db" },
  { icon: Network, label: "CRM & Sales", value: "crm" },
  { icon: Share2, label: "Social Media", value: "social" },
  { icon: Terminal, label: "Dev Tools", value: "dev-tools" },
];

const pricingFilters = ["Free", "Paid", "Open Source"];

export function SidebarFilters() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0">
      <div className="flex flex-col gap-4">
        <h3 className="text-foreground text-sm font-bold uppercase tracking-wider">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary text-muted-foreground"
                )}
              >
                <Icon className="size-5" />
                <span
                  className={cn(
                    "text-sm",
                    isActive ? "font-semibold" : "font-medium"
                  )}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-foreground text-sm font-bold uppercase tracking-wider">
          Pricing
        </h3>
        <div className="flex flex-col gap-3">
          {pricingFilters.map((filter) => (
            <label
              key={filter}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox />
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
