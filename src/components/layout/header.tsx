import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Workflow } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 backdrop-blur-md px-6 md:px-10 py-3">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 text-foreground">
          <Workflow className="size-7" />
          <h2 className="text-foreground text-lg font-bold leading-tight tracking-tight">
            Workflow Marketplace
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
            href="/browse"
          >
            Browse
          </Link>
          <Link
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
            href="/publish"
          >
            Publish
          </Link>
          <Link
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
            href="/docs"
          >
            Docs
          </Link>
          <Link
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
            href="/pricing"
          >
            Pricing
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
        <div className="hidden lg:flex items-center min-w-40 max-w-64">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"/>
            <Input
              className="pl-9 bg-secondary border-border"
              placeholder="Search plugins..."
            />
          </div>
        </div>
        <Button>Get Started</Button>
      </div>
    </header>
  );
}
