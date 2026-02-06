import HeroSection from "@/components/home/hero-section";
import { IntegrationsGrid } from "@/components/home/integrations-grid";
import { SidebarFilters } from "@/components/home/sidebar-filters";
import { Footer } from "@/components/layout/footer";

async function getPluginCategories() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins",
      {
        headers: {
          Authorization: `token ${ process.env.GITHUB_TOKEN }`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${ response.statusText }`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    return data
      .filter((item: any) => item.type === "dir")
      .map((item: any) => item.name);
  } catch (error) {
    console.error("Error fetching plugin categories:", error);
    return ["communication", "ai", "database", "social", "dev-tools"];
  }
}

async function getAllPlugins(categories: string[]) {
  const allPluginsPromises = categories.map(async (category) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${ category }`,
        {
          headers: {
            Authorization: `token ${ process.env.GITHUB_TOKEN }`,
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 3600 },
        },
      );
      if (!response.ok) return [];

      const plugins = await response.json();
      if (!Array.isArray(plugins)) return [];

      const categoryPluginsPromises = plugins
        .filter((item: any) => item.type === "dir")
        .map(async (item: any) => {
          const pluginName = item.name;
          let svgIcon: string | null = null;
          let label = pluginName;
          let description = `An integration for ${ pluginName }.`;

          // Fetch icon and index.ts in parallel
          const [iconResponse, indexResponse] = await Promise.all([
            fetch(
              `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${ category }/${ pluginName }/icon.tsx`,
              {
                headers: {
                  Authorization: `token ${ process.env.GITHUB_TOKEN }`,
                  Accept: "application/vnd.github.v3+json",
                }, next: { revalidate: 3600 },
              },
            ),
            fetch(
              `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${ category }/${ pluginName }/index.ts`,
              {
                headers: {
                  Authorization: `token ${ process.env.GITHUB_TOKEN }`,
                  Accept: "application/vnd.github.v3+json",
                }, next: { revalidate: 3600 },
              },
            ),
          ]);

          // Process icon
          if (iconResponse.ok) {
            const iconData = await iconResponse.json();
            if (iconData.content) {
              const iconContent = Buffer.from(iconData.content, "base64").toString("utf8");
              const svgMatch = iconContent.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
              if (svgMatch) svgIcon = svgMatch[0];
            }
          }

          // Process index.ts
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

          return {
            name: pluginName,
            label: label,
            description: description,
            svgIcon: svgIcon,
            icon: svgIcon ? undefined : "folder",
            iconColor: "text-foreground",
            iconBg: "bg-background",
            category: category,
          };
        });

      return Promise.all(categoryPluginsPromises);
    } catch (error) {
      console.error(`Error fetching plugins for category ${ category }:`, error);
      return [];
    }
  });

  const nestedPlugins = await Promise.all(allPluginsPromises);
  return nestedPlugins.flat();
}

const Page = async () => {
  const categories = await getPluginCategories();
  const allPlugins = await getAllPlugins(categories);

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <main className="flex-1 flex flex-col z-10">
        <HeroSection/>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 px-6 md:px-10 py-16">
          <SidebarFilters categories={ categories }/>
          <IntegrationsGrid integrations={ allPlugins }/>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Page;
