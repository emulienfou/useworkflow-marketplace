import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { SidebarFilters } from "@/components/home/sidebar-filters";
import { IntegrationsGrid } from "@/components/home/integrations-grid";

async function getPluginCategories() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins",
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    const categories = data
      .filter((item: any) => item.type === "dir")
      .map((item: any) => item.name);
      
    return categories;
  } catch (error) {
    console.error("Error fetching plugin categories:", error);
    return ["communication", "ai", "database", "social", "dev-tools"];
  }
}

async function getAllPlugins(categories: string[]) {
  const allPluginsPromises = categories.map(async (category) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${category}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 3600 },
        }
      );
      if (!response.ok) return [];

      const plugins = await response.json();
      if (!Array.isArray(plugins)) return [];

      const categoryPluginsPromises = plugins
        .filter((item: any) => item.type === "dir")
        .map(async (item: any) => {
          const pluginName = item.name;
          let svgIcon: string | null = null;

          try {
            const iconResponse = await fetch(
              `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${category}/${pluginName}/icon.tsx`,
              {
                headers: {
                  Authorization: `token ${process.env.GITHUB_TOKEN}`,
                  Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 },
              }
            );
            if (iconResponse.ok) {
              const iconData = await iconResponse.json();
              if (iconData.content) {
                const iconContent = Buffer.from(iconData.content, 'base64').toString('utf8');
                const svgMatch = iconContent.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
                if (svgMatch) {
                  svgIcon = svgMatch[0];
                }
              }
            }
          } catch (e) {
            // ignore icon fetch error
          }

          return {
            name: pluginName,
            description: `An integration for ${pluginName}`,
            svgIcon: svgIcon,
            icon: svgIcon ? undefined : "folder",
            iconColor: "text-foreground",
            iconBg: "bg-background",
          };
        });
      
      return Promise.all(categoryPluginsPromises);
    } catch (error) {
      console.error(`Error fetching plugins for category ${category}:`, error);
      return [];
    }
  });

  const nestedPlugins = await Promise.all(allPluginsPromises);
  return nestedPlugins.flat();
}

export default async function Home() {
  const categories = await getPluginCategories();
  const allPlugins = await getAllPlugins(categories);

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col z-10">
        <HeroSection />
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 px-6 md:px-10 py-16">
          <SidebarFilters categories={categories} />
          <IntegrationsGrid integrations={allPlugins} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
