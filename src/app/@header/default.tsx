import { Button } from "@/components/ui/button";
import { BlocksIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { Navbar } from "nextra-theme-docs";
import * as React from "react";

const Default = () => (
  <Navbar
    logo={
      <div className="flex items-center gap-8">
        <BlocksIcon className="size-5 text-primary"/>
        <h2 className="text-lg font-bold tracking-tight">
          WorkflowBuilder<span className="text-muted-foreground font-normal"> Marketplace</span>
        </h2>
      </div>
    }
    // ... Your additional navbar options
  >
    <Button size="sm" asChild>
      <Link href="https://github.com/emulienfou/useworkflow-marketplace" target="_blank" rel="noopener noreferrer">
        <GithubIcon/>
      </Link>
    </Button>
  </Navbar>
);

export default Default;
