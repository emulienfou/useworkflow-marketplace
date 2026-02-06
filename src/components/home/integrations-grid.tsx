import { IntegrationCard } from "./integration-card";
import { Button } from "@/components/ui/button";

interface Integration {
  name: string;
  label: string;
  description: string;
  icon?: string;
  svgIcon?: string | null;
  iconColor: string;
  iconBg: string;
}

interface IntegrationsGridProps {
  integrations: Integration[];
}

export function IntegrationsGrid({ integrations }: IntegrationsGridProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          {integrations.length} {integrations.length === 1 ? "Plugin" : "Plugins"}
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

      {integrations.length > 9 && (
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
      )}
    </div>
  );
}
