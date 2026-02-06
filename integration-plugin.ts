import React from "react";

export type PluginCategory = "AI" | "Communication" | "Data" | "Social" | "Utilities";

export interface IntegrationField {
  id: string;
  label: string;
  type: "text" | "password" | "number" | "boolean";
  placeholder?: string;
  configKey: string;
  envVar?: string;
}

export interface IntegrationPlugin {
  type: string;
  label: string;
  description: string;
  category: PluginCategory;
  icon: React.ComponentType<{ className?: string }>;
  formFields: IntegrationField[];
  testConfig: {
    getTestFunction: () => Promise<(credentials: Record<string, string>) => Promise<{
      success: boolean;
      error?: string;
    }>>;
  };
  actions: Array<{
    slug: string;
    label: string;
    description: string;
    stepFunction: string;
    stepImportPath: string;
    configFields: IntegrationField[];
    outputFields: Array<{ field: string; description: string }>;
  }>;
}
