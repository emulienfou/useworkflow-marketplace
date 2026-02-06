import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 backdrop-blur-xl px-6 md:px-10 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-foreground group cursor-pointer">
          <div
            className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <span className="material-symbols-outlined text-lg">
              account_tree
            </span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">
            Workflow<span className="text-muted-foreground font-normal"> Marketplace</span>
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="https://useworkflow.dev/"
                className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
                target="_blank">
            DevKit
          </Link>
          <Link href="https://github.com/vercel-labs/workflow-builder-template"
                className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
                target="_blank">
            Builder
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
        <div className="hidden lg:flex items-center relative">
          <span className="absolute left-3 text-muted-foreground material-symbols-outlined text-lg">
            search
          </span>
          <input
            className="bg-secondary/50 border border-input rounded-full py-1.5 pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all w-64 hover:bg-secondary"
            placeholder="Search integrations..."
          />
          <div className="absolute right-2 flex gap-1">
            <kbd
              className="hidden sm:inline-flex items-center h-5 px-1.5 rounded border border-border bg-muted font-sans text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
        <Button size="sm" className="rounded-full">
          Get Started
        </Button>
      </div>
    </header>
  );
}
