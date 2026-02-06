export interface AppConfig {
  // App/SEO name
  name: string;
  // Hero title
  title: string;
  // App/SEO description
  description: string;
}

const appConfig: AppConfig = {
  name: "WorkflowBuilder Marketplace",
  title: "AI Workflow Builder Plugins Registry",
  description:
    "Extend your automation canvas with verified plugins. Connect LLMs, databases, and external APIs directly into your visual workflows to build complex AI agents faster.",
};

export { appConfig };
