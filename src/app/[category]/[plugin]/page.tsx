import Readme from "@/components/readme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OFFICIAL_PLUGINS } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import { Clock, ExternalLink, FileText, Folder, Scale, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

async function getPluginDetails(category: string, plugin: string) {
  const GITHUB_API_BASE = "https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins";
  const headers = {
    Authorization: `token ${ process.env.GITHUB_TOKEN }`,
    Accept: "application/vnd.github.v3+json",
  };

  const [indexResponse, iconResponse, readmeResponse, commitsResponse] = await Promise.all([
    fetch(`${ GITHUB_API_BASE }/${ category }/${ plugin }/index.ts`, { headers, next: { revalidate: 3600 } }),
    fetch(`${ GITHUB_API_BASE }/${ category }/${ plugin }/icon.tsx`, { headers, next: { revalidate: 3600 } }),
    fetch(`${ GITHUB_API_BASE }/${ category }/${ plugin }/README.md`, { headers, next: { revalidate: 3600 } }),
    fetch(`https://api.github.com/repos/emulienfou/useworkflow-marketplace/commits?path=plugins/${ category }/${ plugin }&per_page=1`, {
      headers,
      next: { revalidate: 3600 },
    }),
  ]);

  let label = plugin;
  let description = `An integration for ${ plugin }.`;
  let svgIcon: string | null = null;
  let readmeContent: string | null = null;
  let lastUpdated = "Unknown";

  if (indexResponse.ok) {
    const indexData = await indexResponse.json();
    if (indexData.content) {
      const indexContent = Buffer.from(indexData.content, "base64").toString("utf8");
      const labelMatch = indexContent.match(/label:\s*"([^"]+)"/);
      const descriptionMatch = indexContent.match(/description:\s*"([^"]+)"/);
      if (labelMatch?.[1]) label = labelMatch[1];
      if (descriptionMatch?.[1]) description = descriptionMatch[1];
    }
  }

  if (iconResponse.ok) {
    const iconData = await iconResponse.json();
    if (iconData.content) {
      const iconContent = Buffer.from(iconData.content, "base64").toString("utf8");
      const svgMatch = iconContent.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
      if (svgMatch) svgIcon = svgMatch[0];
    }
  }

  if (readmeResponse.ok) {
    const readmeData = await readmeResponse.json();
    if (readmeData.content) {
      readmeContent = Buffer.from(readmeData.content, "base64").toString("utf8");
    }
  }

  if (commitsResponse.ok) {
    const commitsData = await commitsResponse.json();
    if (Array.isArray(commitsData) && commitsData.length > 0) {
      const date = new Date(commitsData[0].commit.committer.date);
      lastUpdated = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
  }

  return {
    name: plugin,
    label,
    description,
    svgIcon,
    readmeContent,
    category,
    lastUpdated,
  };
}

const PluginPage = async (props: PageProps<"/[category]/[plugin]">) => {
  const { category, plugin } = await props.params;
  const pluginDetails = await getPluginDetails(category, plugin);

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <main className="max-w-350 mx-auto w-full px-4 md:px-10 py-6">
        <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm">
          <Link className="text-muted-foreground hover:text-primary hover:underline" href="/">Marketplace</Link>
          <span className="text-muted-foreground">/</span>
          <Link className="text-muted-foreground hover:text-primary hover:underline"
                href={ `/${ category }` }>{ capitalize(category) }</Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-bold text-foreground">{ pluginDetails.name }</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-between mb-8 pb-8 border-b">
          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="size-8 rounded-md bg-secondary flex items-center justify-center">
                { pluginDetails.svgIcon ? (
                  <div className="w-5 h-5 text-foreground"
                       dangerouslySetInnerHTML={ { __html: pluginDetails.svgIcon } }/>
                ) : (
                  <Folder className="size-5 text-muted-foreground"/>
                ) }
              </div>
              <h1 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">
                <Link className="text-primary hover:underline" href={ `/${ category }` }>{ capitalize(category) }</Link>
                <span className="text-muted-foreground mx-1">/</span>
                <span className="font-bold">{ pluginDetails.name }</span>
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Public
              </Badge>
              { OFFICIAL_PLUGINS.includes(pluginDetails.name) && (
                <Badge className="bg-green-900/30 text-green-400 border-green-900 tracking-wide">
                  Official
                </Badge>
              ) }
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              { pluginDetails.description }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link
                className="bg-[#238636] hover:bg-[#2ea043]"
                href={ `https://github.com/emulienfou/useworkflow-marketplace/tree/main/plugins/${ category }/${ plugin }` }
                target="_blank"><ExternalLink/> View on GitHub</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-card border rounded-lg overflow-hidden">
              <div
                className="sticky top-0 z-10 bg-secondary/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText className="size-4.5 text-muted-foreground"/>
                  <span>README.md</span>
                </div>
              </div>
              <div className="p-6 md:p-10">
                { pluginDetails.readmeContent ? (
                  <Readme source={ pluginDetails.readmeContent }/>
                ) : (
                  <p className="text-muted-foreground">No README found for this plugin.</p>
                ) }
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col gap-6">
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-bold text-base mb-4 text-foreground">Repository Details</h3>
              <div className="border-t pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">License</span>
                  <div className="flex items-center gap-1 font-medium text-foreground">
                    <Scale className="size-4"/>
                    MIT
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Releases</span>
                  <div className="flex items-center gap-1 font-medium text-foreground">
                    <Tag className="size-4"/>
                    v1.0.0
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <div className="flex items-center gap-1 font-medium text-foreground">
                    <Clock className="size-4"/>
                    { pluginDetails.lastUpdated }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PluginPage;
