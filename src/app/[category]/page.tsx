import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { SidebarFilters } from "@/components/home/sidebar-filters";
import { IntegrationsGrid } from "@/components/home/integrations-grid";

async function getPluginsForCategory(category: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${category}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch plugins for category ${category}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    const plugins = data
      .filter((item: any) => item.type === "dir")
      .map((item: any) => ({
        name: item.name,
        // You can fetch more details for each plugin here if needed
        description: `An integration for ${item.name}`,
        icon: "folder",
        iconColor: "text-foreground",
        iconBg: "bg-background",
      }));
      
    return plugins;
  } catch (error) {
    console.error(`Error fetching plugins for category ${category}:`, error);
    return [];
  }
}

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

const Page = async (props: PageProps<"/[category]">) => {
  const { category } = await props.params;
  const plugins = await getPluginsForCategory(category);
  const categories = await getPluginCategories();

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col z-10">
        <HeroSection />
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 px-6 md:px-10 py-16">
          <SidebarFilters categories={categories} />
          <IntegrationsGrid integrations={plugins} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page
