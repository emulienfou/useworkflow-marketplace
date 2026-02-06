import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import React from "react";

async function getPluginDetails(category: string, plugin: string) {
  const GITHUB_API_BASE = "https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins";
  const headers = {
    Authorization: `token ${ process.env.GITHUB_TOKEN }`,
    Accept: "application/vnd.github.v3+json",
  };

  const [indexResponse, iconResponse, readmeResponse] = await Promise.all([
    fetch(`${ GITHUB_API_BASE }/${ category }/${ plugin }/index.ts`, { headers, next: { revalidate: 3600 } }),
    fetch(`${ GITHUB_API_BASE }/${ category }/${ plugin }/icon.tsx`, { headers, next: { revalidate: 3600 } }),
    fetch(`${ GITHUB_API_BASE }/${ category }/${ plugin }/README.md`, { headers, next: { revalidate: 3600 } }),
  ]);

  let label = plugin;
  let description = `An integration for ${ plugin }.`;
  let svgIcon: string | null = null;
  let readmeContent: string | null = null;

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

  return {
    name: plugin,
    label,
    description,
    svgIcon,
    readmeContent,
    category,
  };
}

function capitalize(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export default async function PluginPage(props: PageProps<"/[category]/[plugin]">) {
  const { category, plugin } = await props.params;
  const pluginDetails = await getPluginDetails(category, plugin);

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <Header/>
      <main className="max-w-[1400px] mx-auto w-full px-4 md:px-10 py-6">
        <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm">
          <Link className="text-muted-foreground hover:text-primary hover:underline" href="/">Marketplace</Link>
          <span className="text-muted-foreground">/</span>
          <Link className="text-muted-foreground hover:text-primary hover:underline"
                href={ `/${ category }` }>{ capitalize(category) }</Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-bold text-foreground">{ pluginDetails.label }</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-between mb-8 pb-8 border-b">
          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="size-8 rounded-md bg-secondary flex items-center justify-center">
                { pluginDetails.svgIcon ? (
                  <div className="w-5 h-5 text-foreground"
                       dangerouslySetInnerHTML={ { __html: pluginDetails.svgIcon } }/>
                ) : (
                  <span className="material-symbols-outlined text-[20px] text-muted-foreground">folder</span>
                ) }
              </div>
              <h1 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">
                <span className="font-bold">{ pluginDetails.label }</span>
              </h1>
              <span
                className="hidden sm:inline-flex items-center rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                Public
              </span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              { pluginDetails.description }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Button variant="outline" asChild>
              <Link
                href={ `https://github.com/emulienfou/useworkflow-marketplace/tree/main/plugins/${ category }/${ plugin }` }
                target="_blank">
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>View on GitHub</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-card border rounded-lg overflow-hidden">
              <div
                className="sticky top-0 z-10 bg-secondary/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="material-symbols-outlined text-[18px] text-muted-foreground">toc</span>
                  <span>README.md</span>
                </div>
              </div>
              <div className="p-6 md:p-10 text-foreground">
                <div className="prose prose-invert max-w-none">
                  { pluginDetails.readmeContent ? (
                    <div
                      dangerouslySetInnerHTML={ { __html: pluginDetails.readmeContent.replace(/# (.*)/g, "<h1>$1</h1>").replace(/## (.*)/g, "<h2>$1</h2>").replace(/### (.*)/g, "<h3>$1</h3>").replace(/\* \s*(.*)/g, "<li>$1</li>").replace(/(\r\n|\n|\r){2}/g, "<br />") } }/>
                  ) : (
                    <p>No README found for this plugin.</p>
                  ) }
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col gap-6">
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-bold text-base mb-4 text-foreground">Repository Details</h3>
              {/* Mocked data for now */ }
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="font-bold text-foreground">1.2k</span> stars
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="material-symbols-outlined text-[18px]">call_split</span>
                  <span className="font-bold text-foreground">234</span> forks
                </div>
              </div>
              <div className="border-t pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">License</span>
                  <span className="font-medium text-foreground">MIT</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium text-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

// Helper component to render buttons, as they are client components
function Button({ children, ...props }: React.ComponentProps<"a"> & React.ComponentProps<"button"> & {
  asChild?: boolean;
  href?: string;
  target?: string,
  variant?: "outline" | "default"
}) {
  const Comp = props.asChild ? "a" : "button";
  return (
    <Comp
      { ...props }
      className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-sm"
    >
      { children }
    </Comp>
  );
}
