import Link from "next/link";
import { Workflow, Code, AtSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background py-16 px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Workflow className="size-7 text-muted-foreground" />
            <h2 className="text-lg font-bold">Workflow Marketplace</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The operating system for the next generation of AI-native companies.
            Deploy autonomous agents in seconds.
          </p>
          <div className="flex gap-4">
            <Link
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border hover:bg-secondary/80 transition-colors"
              href="#"
            >
              <Code className="size-4 text-muted-foreground" />
            </Link>
            <Link
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border hover:bg-secondary/80 transition-colors"
              href="#"
            >
              <AtSign className="size-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold text-sm tracking-wide">
              Product
            </h4>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Marketplace
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              SDK
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Pricing
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold text-sm tracking-wide">
              Resources
            </h4>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Docs
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Changelog
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Community
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold text-sm tracking-wide">
              Legal
            </h4>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Privacy
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
        <p>© 2024 Workflow Marketplace Inc. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
