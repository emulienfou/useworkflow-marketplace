import { appConfig } from "@/config/app";
import { BlocksIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const Default = () => (
  <footer className="mt-20 border-t border-border bg-background py-16 px-10 relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
      <div className="flex flex-col gap-6 max-w-sm">
        <div className="flex items-center gap-2 text-foreground">
          <BlocksIcon className="size-5 text-primary"/>
          <h2 className="text-lg font-bold">{ appConfig.name }</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          { appConfig.description }
        </p>
        <div className="flex gap-4">
          <Link
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border hover:bg-secondary/80 transition-colors"
            href="https://github.com/emulienfou/useworkflow-marketplace"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="size-4"/>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols gap-12 md:gap-20">
        <div className="flex flex-col gap-4">
          <h4 className="text-foreground font-bold text-sm tracking-wide">
            Resources
          </h4>
          <Link
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            href="https://useworkflow.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            DevKit
          </Link>
          <Link
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            href="https://workflow-builder.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Builder Template
          </Link>
          <Link
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            href="/docs"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
    <div
      className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
      <p>© { new Date().getFullYear() } All rights reserved.</p>
      <div className="flex items-center gap-2">
        Product by <Link href="https://davidsanchez.me" target="_blank" rel="noopener noreferrer"
                         className="font-semibold">David Sanchez</Link>
      </div>
    </div>
  </footer>
);

export default Default;
