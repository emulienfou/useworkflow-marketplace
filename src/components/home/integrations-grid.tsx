import { IntegrationCard } from "./integration-card";
import { Button } from "@/components/ui/button";

const integrations = [
  {
    name: "OpenAI GPT-4o",
    description: "Advanced language model for generation",
    icon: "smart_toy",
    iconColor: "text-foreground",
    iconBg: "bg-background",
  },
  {
    name: "Pinecone DB",
    description: "Managed vector database for memory",
    icon: "token",
    iconColor: "text-orange-500",
    iconBg: "bg-background",
  },
  {
    name: "Salesforce",
    description: "Sync leads and opportunities",
    icon: "cloud_sync",
    iconColor: "text-blue-500",
    iconBg: "bg-background",
  },
  {
    name: "Discord Bot",
    description: "Interactive AI bots for your server",
    icon: "chat",
    iconColor: "text-indigo-500",
    iconBg: "bg-background",
  },
  {
    name: "GitHub Actions",
    description: "Trigger workflows on PRs",
    icon: "commit",
    iconColor: "text-red-500",
    iconBg: "bg-background",
  },
  {
    name: "Google Sheets",
    description: "Data sync for spreadsheets",
    icon: "table_rows",
    iconColor: "text-green-600",
    iconBg: "bg-background",
  },
  {
    name: "Zapier Hook",
    description: "Universal webhook receiver",
    icon: "bolt",
    iconColor: "text-purple-500",
    iconBg: "bg-background",
  },
  {
    name: "Notion Sync",
    description: "Knowledge base synchronization",
    icon: "folder_open",
    iconColor: "text-yellow-500",
    iconBg: "bg-background",
  },
  {
    name: "SendGrid",
    description: "Transactional email service",
    icon: "mail",
    iconColor: "text-blue-400",
    iconBg: "bg-background",
  },
];

export function IntegrationsGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Featured Integrations
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <span className="material-symbols-outlined text-lg">sort</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.name} {...integration} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </Button>
        <Button variant="default" size="icon" className="h-9 w-9 font-bold">
          1
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
          2
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
          3
        </Button>
        <span className="mx-2 text-muted-foreground">...</span>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </Button>
      </div>
    </div>
  );
}
