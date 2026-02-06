import { getPluginsForCategory } from "@/app/actions";
import { IntegrationsGrid } from "@/components/home/integrations-grid";
import { appConfig } from "@/config/app";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";

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
