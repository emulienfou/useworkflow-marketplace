import {
  BrainIcon,
  ClipboardCheckIcon,
  LandmarkIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  TerminalIcon,
} from "lucide-react";
import type React from "react";

export interface Category {
  slug: string;
  label: string;
  icon: React.ElementType;
}

export interface AppConfig {
  // App/SEO name
  name: string;
  // Hero title
  title: string;
  // App/SEO description
  description: string;
  categories: Category[];
  officialPlugins: string[];
}

const appConfig: AppConfig = {
  name: "WorkflowBuilder Marketplace",
  title: "AI Workflow Builder Plugins Registry",
  description:
    "Extend your automation canvas with verified plugins. Connect LLMs, databases, and external APIs directly into your visual workflows to build complex AI agents faster.",
  categories: [
    { slug: "all", label: "All Plugins", icon: LayoutGridIcon },
    { slug: "ai", label: "AI & LLMs", icon: BrainIcon },
    { slug: "communication", label: "Communication", icon: MessageSquareIcon },
    { slug: "development", label: "Development", icon: TerminalIcon },
    { slug: "finance", label: "Finance", icon: LandmarkIcon },
    { slug: "marketing", label: "Marketing", icon: MegaphoneIcon },
    { slug: "productivity", label: "Productivity", icon: ClipboardCheckIcon },
  ],
  officialPlugins: [
    "ai-gateway",
    "fal",
    "firecrawl",
    "perplexity",
    "superagent",
    "v0",
    "resend",
    "slack",
    "clerk",
    "github",
    "stripe",
    "webflow",
    "linear",
  ],
};

export { appConfig };
