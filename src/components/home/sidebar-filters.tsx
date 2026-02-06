"use client";

import { cn } from "@/lib/utils";
import {
  BrainIcon,
  ClipboardCheckIcon,
  Folder,
  LandmarkIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const categoryIcons: Record<string, React.ElementType> = {
  all: LayoutGridIcon,
  ai: BrainIcon,
  communication: MessageSquareIcon,
  development: TerminalIcon,
  finance: LandmarkIcon,
  marketing: MegaphoneIcon,
  productivity: ClipboardCheckIcon,
};

const categoryLabels: Record<string, string> = {
  all: "All Plugins",
  ai: "AI & LLMs",
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
          { allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const href = cat === "all" ? "/" : `/${ cat }`;
            const Icon = categoryIcons[cat] || Folder;

            return (
              <Link
                key={ cat }
                href={ href }
                className={ cn(
                  "relative flex items-center gap-3 px-3 py-2 rounded-md group transition-all",
                  isActive
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                ) }
              >
                <Icon
                  className={ cn(
                    "size-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  ) }
                />
                <span className="text-sm">{ categoryLabels[cat] || capitalize(cat) }</span>
              </Link>
            );
          }) }
        </div>
      </div>
    </aside>
  );
}
