import { IntegrationsGrid } from "@/components/home/integrations-grid";
import { appConfig } from "@/config/app";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";

async function getPluginsForCategory(category: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/emulienfou/useworkflow-marketplace/contents/plugins/${ category }`,
      {
        headers: {
          Authorization: `token ${ process.env.GITHUB_TOKEN }`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch plugins for category ${ category }: ${ response.statusText }`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    const pluginsPromises = data
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

    return Promise.all(pluginsPromises);
  } catch (error) {
    console.error(`Error fetching plugins for category ${ category }:`, error);
    return [];
  }
}

export const generateMetadata = async (props: PageProps<"/[category]">): Promise<Metadata> => {
  const { category } = await props.params;

  return {
    title: appConfig.categories.filter((cat) => cat.slug === category)[0]?.label || capitalize(category),
  };
};

const Page = async (props: PageProps<"/[category]">) => {
  const { category } = await props.params;
  const plugins = await getPluginsForCategory(category);

  return <IntegrationsGrid integrations={ plugins }/>;
};

export default Page;
