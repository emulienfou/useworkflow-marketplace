import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app";
import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

import "nextra-theme-docs/style.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${ appConfig.name }`,
  },
  description: appConfig.description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center flex-1 space-x-2 dark">
        LOGO
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
          EDMDb <span className="text-slate-500 font-normal">Developers</span>
        </h2>
      </div>
    }
    // ... Your additional navbar options
  >
    <Button variant="default" asChild className="text-white hover:text-white hover:bg-white/10">
      <a href="https://edmdb.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mr-1">
        Back to EDMDb
        <ArrowUpRightIcon/>
      </a>
    </Button>
  </Navbar>
);

const RootLayout = async (props: LayoutProps<"/">) => {
  const pageMap = await getPageMap();

  return (
    <html lang="en" className="dark" style={ { colorScheme: "dark" } }>
    <body
      className={ `${ spaceGrotesk.variable } ${ inter.variable } font-display antialiased selection:bg-primary/30 selection:text-primary bg-background text-foreground min-h-screen` }
    >
      <Layout
        navbar={ props.header }
        pageMap={ pageMap }
        docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
        footer={ props.footer }
        editLink="Edit this page on GitHub"
        sidebar={ { defaultMenuCollapseLevel: 1 } }
        darkMode={ false }
        nextThemes={ { defaultTheme: "dark" } }
        // ... Your additional layout options
      >
        { props.children }
      </Layout>
      {/*{ props.header }*/ }
    </body>
    </html>
  );
};
export default RootLayout;
