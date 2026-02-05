import Link from "next/link";
import { Workflow } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-secondary/50 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-3 text-foreground">
            <Workflow className="size-7" />
            <h2 className="text-foreground text-lg font-bold">
              Workflow Market
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Building the future of AI automation. Connect tools, create
            workflows, and scale your business with the power of modern LLMs.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold text-sm">Platform</h4>
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
              Builder
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Cloud
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold text-sm">Resources</h4>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Documentation
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              API Reference
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Community
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold text-sm">Company</h4>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Blog
            </Link>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t flex justify-between items-center text-xs text-muted-foreground">
        <p>&copy; 2026 Workflow Market Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
