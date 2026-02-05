import {
  Bot,
  Coins,
  CloudCog,
  MessageCircle,
  GitBranch,
  Table2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { IntegrationCard } from "./integration-card";

const integrations = [
  {
    name: "OpenAI GPT-4o",
    description:
      "Advanced language model for text generation, translation, and creative reasoning.",
    category: "AI & LLMs",
    icon: Bot,
    iconColor: "#258df4",
    badge: { label: "Popular", variant: "popular" as const },
  },
  {
    name: "Pinecone DB",
    description:
      "Managed vector database for long-term memory in AI agents and search.",
    category: "Vector Databases",
    icon: Coins,
    iconColor: "#ff6a00",
    badge: { label: "New", variant: "new" as const },
  },
  {
    name: "Salesforce",
    description:
      "Sync leads, opportunities, and tasks directly into your AI workflows.",
    category: "CRM",
    icon: CloudCog,
    iconColor: "#00a1e0",
    badge: { label: "Popular", variant: "popular" as const },
  },
  {
    name: "Discord Bot",
    description:
      "Create interactive AI bots for your server with slash commands and events.",
    category: "Social Media",
    icon: MessageCircle,
    iconColor: "#7289da",
  },
  {
    name: "GitHub Actions",
    description:
      "Trigger workflows on PRs, issues, or releases using AI analysis.",
    category: "Dev Tools",
    icon: GitBranch,
    iconColor: "#f05032",
  },
  {
    name: "Google Sheets",
    description:
      "Read and write data to spreadsheets directly from your AI agent.",
    category: "Productivity",
    icon: Table2,
    iconColor: "#00a300",
    badge: { label: "New", variant: "new" as const },
  },
];

export function IntegrationsGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          Featured Integrations
        </h2>
        <button className="p-2 rounded-lg border hover:bg-secondary text-muted-foreground transition-colors">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.name} {...integration} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <button className="size-10 flex items-center justify-center rounded-lg border hover:bg-secondary transition-colors">
          <ChevronLeft className="size-4" />
        </button>
        <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          1
        </button>
        <button className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          2
        </button>
        <button className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          3
        </button>
        <span className="mx-2 text-muted-foreground">...</span>
        <button className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          12
        </button>
        <button className="size-10 flex items-center justify-center rounded-lg border hover:bg-secondary transition-colors">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
